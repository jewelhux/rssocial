import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import userModel from '../models/user.model';
import CustomError from '../util/customError';

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(new CustomError('No auth token', 401));
    }

    const decoded = verify(token, process.env.JWT_SECRET as string);

    if (!decoded) {
      return next(new CustomError('Invalid token', 401));
    }

    const user = await userModel.findById(decoded.sub).select('+isAdmin').lean();
    if (!user) {
      return next(new CustomError('No such user', 401));
    }

    res.locals.user = user;

    next();
  } catch (e) {
    next(new CustomError('Unauthorized', 401));
  }
};
