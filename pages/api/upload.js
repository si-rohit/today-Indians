import crypto from "crypto";
import multer from "multer";
import aws from "aws-sdk";
import fs from "fs";
import path from "path";

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const upload = multer({ dest: "/tmp" });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default function handler(req, res) {
    if (req.method === "POST") {
        upload.single("file")(req, res, async (err) => {
            if (err) {
                console.log(err.message);
                return res.status(200).json({ response: "error" });
            }

            try {
                const file = req.file;
                const {fileUploadingPath} = req.body;
                // console.log("file =", JSON.stringify(file, null, 2));
                if (!file) {
                    return res.status(400).json({ response: "error", message: "no file uploaded" });
                    
                }
                if (!fileUploadingPath) {
                    return res.status(400).json({ response: "error", message: "no file uploading path" });
                    
                }
                const fileContent = fs.readFileSync(file.path);

                const fileHash = crypto.createHash("sha256").update(fileContent).digest("hex");
                const fileExtension = path.extname(file.originalname);
                const fileName = fileHash + fileExtension;

                try {
                    await s3.headObject({
                        Bucket: process.env.AWS_BUCKET_NAME,
                        Key: `${fileUploadingPath}/${fileName}`,
                    }).promise();
                    fs.unlinkSync(file.path);
                    return res.status(409).json({ response: "error", message: "file already exists" });

                } catch (err) {
                    if (err.code !== "NotFound") {
                        fs.unlinkSync(file.path);
                        return res.status(500).json({ response: "error", message: "failed to check file existence" });
                    }
                }


                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: `${fileUploadingPath}/${fileName}`,
                    Body: fileContent,
                    ContentType: file.mimetype,
                };

                const { Location } = await s3.upload(params).promise();
                fs.unlinkSync(file.path);

                console.log('✅ Upload Direct - 1 REQUEST COMPLETED');

                res.status(200).json({
                    response: "ok",
                    file: Location
                });
            }

            catch (error) {
                console.log('❌ Upload Direct - 1 REQUEST FAILED');
                console.log(err.message);
                res.status(200).json({ response: "error" });
            }
        });
    } else {
        res.status(405).json({ response: "error", message: 'method' });
    }
}