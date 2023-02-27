import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import { ZodError } from 'zod';
import CustomError from '../util/customError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (e: unknown, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof CustomError) return res.status(e.statusCode).json(e.response());

  if (e instanceof ZodError)
    return res
      .status(400)
      .json({ status: 'fail', message: e.errors.map((el) => el.message).join(', ') });

  if (e instanceof MulterError) return res.status(400).json({ status: 'fail', message: e.code });

  return res.status(500).json({ status: 'fail', message: 'Internal error' });
};

export default errorHandler;
