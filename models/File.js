import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    name: String,
    key: String, // full S3 key: uploads/docs/file.pdf
    url: String, // S3 URL
    folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder", default: null },
    size: Number,
    type: String,
  },
  { timestamps: true }
);

export default mongoose.models.File || mongoose.model("File", fileSchema);
