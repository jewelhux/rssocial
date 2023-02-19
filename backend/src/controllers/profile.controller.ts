import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import userModel, { User } from '../models/user.model';
import { UpdateProfileInput } from '../schemas/profile.schema';
import CustomError from '../util/customError';

export const searchProfiles = async (
  req: Request<object, object, object, { q?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    let query: FilterQuery<User> = { _id: { $ne: res.locals.user.id } };
    if (req.query.q && req.query.q?.length > 0) {
      const [criteria1, criteria2] = req.query.q.split(' ');
      query = {
        $and: [
          { _id: { $ne: res.locals.user.id } },
          {
            $or: [
              {
                name: {
                  $regex: criteria2 ? `^${criteria1}|^${criteria2}` : `^${criteria1}`,
                  $options: 'i'
                }
              },
              {
                lastname: {
                  $regex: criteria2 ? `^${criteria1}|^${criteria2}` : `^${criteria1}`,
                  $options: 'i'
                }
              }
            ]
          }
        ]
      };
    }

    const profiles = await userModel.find(query);

    return res.status(200).json({ status: 'success', profiles });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getProfile = async (
  req: Request<object, object, object, { id?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.query.id || req.query.id === res.locals.user.id) {
      return res.status(200).json({
        status: 'success',
        profile: { ...res.locals.user, isOwn: true }
      });
    }

    const profile = await userModel.findById(req.query.id);

    if (!profile) return next(new CustomError('Profile not found', 404));

    res.status(200).json({
      status: 'success',
      profile
    });
  } catch (e) {
    next(e);
  }
};

export const updateProfile = async (
  req: Request<object, object, UpdateProfileInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user;
    const profile = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    if (!profile) return next(new CustomError('Profile not found', 404));
    res.status(200).json({
      status: 'success',
      profile
    });
  } catch (e) {
    next(e);
  }
};
