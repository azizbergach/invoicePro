import * as formidable from "formidable";
import * as fs from "fs";
import path from "path";


export const config = {
    api: {
        bodyParser: false, // Disallow body parsing, let formidable handle it
    },
};


export default async (req, res) => {
    console.log("run");
    const form = formidable();
    form.parse(req, async (error, fields, files) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: "Error uploading avatar." });
            return;
        }

        const uploadedFile = files.avatar;
        const filePath = path.join(process.cwd(), "public", "avatar", uploadedFile.originalFilename);
        await fs.promises.rename(uploadedFile.filepath, filePath);
        console.log(filePath);
        res.status(200).json({ filePath });
    });
}
