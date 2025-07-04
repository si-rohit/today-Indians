import dbConnect from '@/utils/dbConnect';
import Folder from '@/models/Folder';
import File from '@/models/File'; // assuming you have a File model

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await dbConnect();

  const { folderId ,folderName } = req.body;

  if (!folderId && !folderName) {
    return res.status(400).json({ error: 'Missing folderId or folderName' });
  }
  // console.log(folderId,folderName);
  try {
    // Fetch folders with matching parentId (or root)

    let parentId ='';

    if(!folderId){
      const folder = await Folder.findOne({ name: folderName }).lean();
      if (!folder) return res.status(404).json({ error: "Folder not found" });
      parentId = folder._id;
    }
    const folders = await Folder.find({ parentId: folderId || parentId }).lean();


    // Fetch files inside this folder
    // console.log(folderId || parentId);
    const files = await File.find({ folderId: folderId || parentId }).lean();

    res.status(200).json({
      folders: folders.map(f => ({ _id: f._id, name: f.name })),
      files: files.map(f => ({ _id: f._id, name: f.name, url: f.url })),
    });
  } catch (err) {
    console.error('Fetch folder error:', err);
    res.status(500).json({ error: 'Failed to fetch folders/files' });
  }
}
