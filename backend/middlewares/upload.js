import multer from "multer";
import path from "path";
import fs from "fs";

// ========================================
// Create Upload Folders Automatically
// ========================================

const folders = [

    "uploads",

    "uploads/xray",

    "uploads/mri",

    "uploads/ct",

    "uploads/reports",

    "uploads/ocr"

];

folders.forEach((folder) => {

    if (!fs.existsSync(folder)) {

        fs.mkdirSync(folder, { recursive: true });

    }

});

// ========================================
// Storage
// ========================================

const storage = multer.diskStorage({

    destination(req, file, cb) {

        const mime = file.mimetype;

        if (

            mime.startsWith("image/")

        ) {

            cb(null, "uploads/xray");

        }

        else if (

            mime === "application/pdf" ||

            mime === "application/msword" ||

            mime ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

        ) {

            cb(null, "uploads/reports");

        }

        else {

            cb(null, "uploads");

        }

    },

    filename(req, file, cb) {

        const ext = path.extname(file.originalname);

        const filename =

            Date.now() +

            "-" +

            Math.round(Math.random() * 1E9) +

            ext;

        cb(null, filename);

    }

});

// ========================================
// Allowed File Types
// ========================================

const fileFilter = (req, file, cb) => {

    const allowed = [

        "image/jpeg",

        "image/jpg",

        "image/png",

        "image/webp",

        "image/bmp",

        "image/tiff",

        "application/pdf",

        "application/msword",

        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"

    ];

    if (allowed.includes(file.mimetype)) {

        cb(null, true);

    }

    else {

        cb(

            new Error(

                "Unsupported file format."

            ),

            false

        );

    }

};

// ========================================
// Multer Upload
// ========================================

export const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 20 * 1024 * 1024 // 20 MB

    }

});