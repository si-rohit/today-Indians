import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "Folder" },
  s3Path: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Folder || mongoose.model("Folder", folderSchema);
