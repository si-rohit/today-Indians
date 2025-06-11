import dbConnect from '@/utils/dbConnect'; // You need to create this helper
import Folder from '@/models/Folder';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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

  const { folderName, parentId } = req.body;

  try {
    let parentPath = "users/"; // Default root path

    if (parentId) {
      const parentFolder = await Folder.findById(parentId);
      if (!parentFolder) return res.status(404).json({ error: "Parent folder not found" });
      parentPath = parentFolder.s3Path;
    }

    const folderPath = `${parentPath}${folderName}/`;

    // Create "folder" in S3
    const command = new PutObjectCommand({
      Bucket: "thetodayindians",
      Key: folderPath,
      Body: "",
    });
    await s3.send(command);

    // Save in MongoDB
    const newFolder = new Folder({ name: folderName, parentId: parentId || null, s3Path: folderPath });
    await newFolder.save();

    res.status(200).json({ message: "Folder created", folder: newFolder });
  } catch (err) {
    console.error("Error creating folder:", err);
    res.status(500).json({ error: "Server error" });
  }
}
