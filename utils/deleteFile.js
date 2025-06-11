import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const deleteS3File = async (key) => {
  const command = new DeleteObjectCommand({
    Bucket: "thetodayindians", // ✅ replace with your bucket name
    Key: key,                  // ✅ full path like 'uploads/image.jpg'
  });

  try {
    await s3.send(command);
    return { success: true };
  } catch (error) {
    console.error("S3 delete error:", error);
    throw new Error("Failed to delete file");
  }
};
