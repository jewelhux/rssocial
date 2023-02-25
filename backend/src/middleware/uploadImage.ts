import { Request } from 'express';
import multer from 'multer';
import { generateUniqueName } from '../util/uniqueFileName';

const multerStorage = multer.diskStorage({
  destination(req: Request, file: Express.Multer.File, cb) {
    cb(null, `${__dirname}/../../uploads`);
  },
  filename(req: Request, file: Express.Multer.File, cb) {
    const filename = generateUniqueName(file.fieldname);
    req.body[file.fieldname] = process.env.UPLOADS_URL + filename;
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
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});

export const uploadImage = (fieldname: string) => upload.single(fieldname);
