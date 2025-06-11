// pages/api/folder-size.js
import Folder from "@/models/Folder";
import dbConnect from "@/utils/dbConnect";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const { id } = req.query;
  if (!id) {
    return res.status(400).json({ error: "Missing folder ID" });
  }

  let path = null;
  if (id) {
    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ error: "Folder not found" });
    }
    path = folder.s3Path;
  }

  if (!path) {
    return res.status(400).json({ error: "Missing folder path" });
  }

  try {
    let continuationToken = undefined;
    let totalSize = 0;

    // Loop in case of paginated results (more than 1000 objects)
    do {
      const command = new ListObjectsV2Command({
        Bucket: "thetodayindians",
        Prefix: path.endsWith("/") ? path : path + "/",
        ContinuationToken: continuationToken,
      });

      const response = await s3.send(command);
      const files = response.Contents || [];
      continuationToken = response.IsTruncated ? response.NextContinuationToken : undefined;

      // Sum sizes
      for (const file of files) {
        totalSize += file.Size || 0;
      }
    } while (continuationToken);

    res.status(200).json({ path, sizeInBytes: totalSize });
  } catch (error) {
    console.error("Folder size fetch error:", error);
    res.status(500).json({ error: "Failed to calculate folder size" });
  }
}
