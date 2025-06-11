import dbConnect from '@/utils/dbConnect';
import Folder from '@/models/Folder';
import {
  S3Client,
  ListObjectsV2Command,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

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

  const { folderId, newParentId } = req.body;

  try {
    const folder = await Folder.findById(folderId);
    if (!folder) return res.status(404).json({ error: "Folder not found" });

    // Get new parent path
    let newParentPath = "uploads/";
    if (newParentId) {
      const newParent = await Folder.findById(newParentId);
      if (!newParent) return res.status(404).json({ error: "New parent folder not found" });
      newParentPath = newParent.s3Path;
    }

    const newFolderPath = `${newParentPath}${folder.name}/`;

    // Move files in S3
    const listCommand = new ListObjectsV2Command({
      Bucket: "thetodayindians",
      Prefix: folder.s3Path,
    });
    const { Contents } = await s3.send(listCommand);

    for (const item of Contents || []) {
      const oldKey = item.Key;
      const newKey = oldKey.replace(folder.s3Path, newFolderPath);

      await s3.send(new CopyObjectCommand({
        Bucket: "thetodayindians",
        CopySource: `thetodayindians/${oldKey}`,
        Key: newKey,
      }));

      await s3.send(new DeleteObjectCommand({
        Bucket: "thetodayindians",
        Key: oldKey,
      }));
    }

    const oldFolderPath = folder.s3Path;

    // Update main folder
    folder.parentId = newParentId || null;
    folder.s3Path = newFolderPath;
    await folder.save();

    // Update all child folders’ s3Path
    const childFolders = await Folder.find({ s3Path: { $regex: `^${oldFolderPath}` } });
    for (const child of childFolders) {
      child.s3Path = child.s3Path.replace(oldFolderPath, newFolderPath);
      await child.save();
    }

    res.status(200).json({ message: "Folder moved", folder });
  } catch (error) {
    console.error("Move folder error:", error);
    res.status(500).json({ error: "Move failed" });
  }
}
