import multer from "multer";

const storage = multer.diskStorage({

    destination(req, file, cb) {

        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png"
        ) {

            cb(null, "uploads/xray");

        } else {

            cb(null, "uploads/reports");

        }
    },

    filename(req, file, cb) {

        cb(null, Date.now() + "-" + file.originalname);

    }

});

export const upload = multer({ storage });