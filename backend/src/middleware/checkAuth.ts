import { NextFunction, Request, Response } from 'express';
import { IncomingMessage } from 'http';
import { verify } from 'jsonwebtoken';
import { Socket } from 'socket.io';
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

interface CustomMessage extends IncomingMessage {
  cookies: {
    [key: string]: string;
  };
}

export const checkSocketAuth = (socket: Socket, next: (error?: Error) => void) => {
  const { token } = (socket.request as CustomMessage).cookies;
  try {
    const decoded = verify(token, process.env.JWT_SECRET as string);
    // eslint-disable-next-line no-param-reassign
    socket.handshake.auth.user = decoded.sub;
    next();
  } catch {
    next(new Error('Unauthorized'));
  }
};
