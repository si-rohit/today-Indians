import dbConnect from '@/utils/dbConnect';
import Folder from '@/models/Folder';
import File from '@/models/File';
import {
  S3Client,
  ListObjectsV2Command,
  CopyObjectCommand,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  const { itemId, type, newName } = req.body;

  if (!itemId || !type || !newName) {
    return res.status(400).json({ error: 'Missing itemId, type, or newName' });
  }

  try {
    if (type === 'folder') {
      const folder = await Folder.findById(itemId);
      if (!folder) return res.status(404).json({ error: 'Folder not found' });

      const parts = folder.s3Path.split('/');
    parts[parts.length - 2] = newName; // Replace folder name
    const newPath = parts.filter(Boolean).join('/') + '/';


      // 1. List all objects in old path
      const listCommand = new ListObjectsV2Command({
        Bucket: process.env.AWS_BUCKET_NAME,
        Prefix: folder.s3Path
      });
      const listResult = await s3.send(listCommand);

      const objects = listResult.Contents || [];

      // 2. Copy each object to new path
      for (const obj of objects) {
        const oldKey = obj.Key;
        const newKey = oldKey.replace(folder.s3Path, newPath);

        await s3.send(new CopyObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          CopySource: `${process.env.AWS_BUCKET_NAME}/${oldKey}`,
          Key: newKey
        }));

        await s3.send(new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: oldKey
        }));
      }

      // 3. Update MongoDB folder path
      const oldPath = folder.s3Path;
      folder.name = newName;
      folder.s3Path = newPath;
      await folder.save();

    // Also update all children paths
    const children = await Folder.find({ s3Path: { $regex: `^${oldPath}` } });
    for (const child of children) {
      child.s3Path = child.s3Path.replace(oldPath, newPath);
      await child.save();
    }

      // const updatedFiles = await File.updateMany(
      //   { path: { $regex: `^${oldPath}` } },
      //   [
      //     {
      //       $set: {
      //         path: {
      //           $replaceOne: {
      //             input: '$path',
      //             find: oldPath,
      //             replacement: newPath
      //           }
      //         },
      //         url: {
      //           $replaceOne: {
      //             input: '$url',
      //             find: oldPath,
      //             replacement: newPath
      //           }
      //         }
      //       }
      //     }
      //   ]
      // );

      return res.status(200).json({
        message: 'Folder renamed in MongoDB and S3',
        movedObjects: objects.length
      });
    }

    if (type === 'file') {
      const file = await File.findById(itemId);
      if (!file) return res.status(404).json({ error: 'File not found' });

      const oldKey = file.url.split('.amazonaws.com/')[1];
      const pathPrefix = oldKey.substring(0, oldKey.lastIndexOf('/') + 1);
      const newKey = pathPrefix + newName;

      await s3.send(new CopyObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        CopySource: `${process.env.AWS_BUCKET_NAME}/${oldKey}`,
        Key: newKey
      }));

      await s3.send(new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: oldKey
      }));

      file.name = newName;
      file.url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${newKey}`;
      await file.save();

      return res.status(200).json({ message: 'File renamed successfully' });
    }

    return res.status(400).json({ error: 'Invalid type' });
  } catch (err) {
    console.error('Rename error:', err);
    res.status(500).json({ error: 'Server error during rename' });
  }
}
