import { Request, Response } from 'express';
import CustomError from '../util/customError';

const errorHandler = (e: unknown, req: Request, res: Response) => {
  if (e instanceof CustomError) res.status(e.statusCode).json(e.response());
  else res.status(500).json({ status: 'fail', message: 'Internal error' });
};

export default errorHandler;
