import multer from "multer";
const { diskStorage } = multer;

function uploadFile(destination) {
    const storage = diskStorage({});

    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/webp"
        ) {
            cb(null, true);
        } else {
            cb("File Type not supported", false);
        }
    };

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
        fileFilter: fileFilter,
    });

    return upload;
}

export default uploadFile;