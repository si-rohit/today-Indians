import Folder from "@/models/Folder";
import dbConnect from "@/utils/dbConnect";

export default async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    await dbConnect();

    const {id, name} = req.body;

    if (id) {
       const folder = await Folder.findOne({ _id: id }).lean();
        if (!folder) {
            return res.status(404).json({ error: "Folder not found" });        
        }
        res.status(200).json({folder});  
    }else if(name){
        const folder = await Folder.findOne({ name: name }).lean();
        if (!folder) {
            return res.status(404).json({ error: "Folder not found" });        
        }
        res.status(200).json({folder});
    }else{
        return res.status(400).json({ error: "Missing folderId or folderName" });
    }
    
}