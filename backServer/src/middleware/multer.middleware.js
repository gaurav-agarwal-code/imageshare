import multer from 'multer';

export const upload = multer({ dest: "/uploads" })


//new
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}_${path.extname(file.originalname)}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}
export const uploadMiddleware = multer({ storage, fileFilter })