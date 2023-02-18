import { Request, Response, NextFunction } from 'express';
import CustomError from '../util/customError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (e: unknown, req: Request, res: Response, next: NextFunction) => {
  if (e instanceof CustomError) return res.status(e.statusCode).json(e.response());
  return res.status(500).json({ status: 'fail', message: 'Internal error' });
};

export default errorHandler;
