import dbConnect from "@/utils/dbConnect";
import Folder from "@/models/Folder";
import File from "@/models/File";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function deleteFolderRecursive(folderId) {
  const childFolders = await Folder.find({ parentId: folderId });
  const childFiles = await File.find({ parentId: folderId });

  // Recursively delete child folders
  for (const folder of childFolders) {
    await deleteFolderRecursive(folder._id);
  }

  // Delete files from S3 and DB
  for (const file of childFiles) {
    const key = file.url.split(".amazonaws.com/")[1];
    await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }));
    await File.deleteOne({ _id: file._id });
  }

  // Delete this folder from DB
  await Folder.deleteOne({ _id: folderId });
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const { itemId, type } = req.body;

  if (!itemId || !type) {
    return res.status(400).json({ error: "please Select the folder" });
  }

  // console.log(itemId,type)

  try {
    if (type === "folder") {
      await deleteFolderRecursive(itemId);
      return res.status(200).json({ message: "Folder and contents deleted" });
    }

    if (type === "file") {
      const file = await File.findById(itemId);
      if (!file) return res.status(404).json({ error: "File not found" });

      const key = file.url.split(".amazonaws.com/")[1];

      await s3.send(new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key }));
      await File.deleteOne({ _id: itemId });

      return res.status(200).json({ message: "File deleted successfully" });
    }

    return res.status(400).json({ error: "Invalid type" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error during deletion" });
  }
}
