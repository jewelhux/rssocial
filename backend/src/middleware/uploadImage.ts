import { Request } from 'express';
import multer from 'multer';

const multerStorage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, `${__dirname}/../../uploads`);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    const filename = `image-${Date.now().toString(32)}${Math.random().toString(32).slice(2)}`;
    req.body.image = filename;
    cb(null, filename);
  }
});

const multerFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (!file.mimetype.startsWith('image')) {
    return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
  }
  cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024, files: 1 }
});

export const uploadImage = upload.single('image');
