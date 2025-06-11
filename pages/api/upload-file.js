import formidable from "formidable";
import { IncomingForm } from 'formidable';
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dbConnect from "@/utils/dbConnect";
import File from "@/models/File";
import Folder from "@/models/Folder";

export const config = {
  api: { bodyParser: false },
};

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  await dbConnect();

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parsing failed" });

    const { folderId } = fields;
    const file = files.file[0];
    const fileStream = fs.createReadStream(file.filepath);

    let s3Path = "uploads/";
    if (folderId) {
      const folder = await Folder.findById(folderId);
      if (!folder) return res.status(404).json({ error: "Folder not found" });
      s3Path = folder.s3Path;
    }

    const s3Key = `${s3Path}${file.originalFilename}`;

    try {
      await s3.send(new PutObjectCommand({
        Bucket: "thetodayindians",
        Key: s3Key,
        Body: fileStream,
        ContentType: file.mimetype,
      }));

      const fileUrl = `https://thetodayindians.s3.ap-south-1.amazonaws.com/${s3Key}`;

      const newFile = await File.create({
        name: file.originalFilename,
        key: s3Key,
        url: fileUrl,
        size: file.size,
        type: file.mimetype,
        folderId: folderId || null,
      });

      res.status(200).json({ file: newFile });
    } catch (uploadErr) {
      console.error("S3 Upload Error:", uploadErr);
      res.status(500).json({ error: "Upload failed" });
    }
  });
}
