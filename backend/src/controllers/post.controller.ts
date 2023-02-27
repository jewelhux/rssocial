import { NextFunction, Request, Response } from 'express';
import { Types as MongoTypes } from 'mongoose';
import { AddPostInput, PostByIdInput } from '../schemas/post.schema';
import postModel from '../models/post.model';
import CustomError from '../util/customError';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = MongoTypes.ObjectId.isValid(res.locals.userId)
      ? new MongoTypes.ObjectId(res.locals.userId)
      : '';
    const posts = await postModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'profile'
        }
      },
      { $unwind: '$profile' },
      {
        $addFields: {
          user: '$profile._id',
          avatar: '$profile.avatar',
          name: { $concat: ['$profile.name', ' ', '$profile.lastname'] },
          likesCount: { $size: '$likes' },
          isLiked: { $in: [id, '$likes'] }
        }
      },
      { $unset: ['likes', 'profile'] }
    ]);

    res.status(200).json({
      status: 'success',
      posts: posts.reverse()
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};

export const getPostsByUser = async (
  req: Request<object, object, object, { id?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.query.id && !MongoTypes.ObjectId.isValid(req.query.id))
      return next(new CustomError('Invalid id', 400));

    const id = req.query.id ? new MongoTypes.ObjectId(req.query.id) : res.locals.user._id;

    const posts = await postModel.aggregate([
      { $match: { user: id } },
      {
        $addFields: {
          likesCount: { $size: '$likes' },
          isLiked: { $in: [res.locals.user._id, '$likes'] }
        }
      },
      { $unset: ['likes'] }
    ]);

    res.status(200).json({
      status: 'success',
      posts: posts.reverse()
    });
  } catch (e) {
    next(e);
  }
};

export const addPost = async (
  req: Request<object, object, AddPostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user;
    const post = await postModel.create({ user: id, ...req.body });
    res.status(200).json({
      status: 'success',
      post
    });
  } catch (e) {
    next(e);
  }
};

export const deletePost = async (
  req: Request<PostByIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, isAdmin } = res.locals.user;

    const post = await postModel.findById(req.params.id);
    if (!post) return next(new CustomError('Not found', 404));
    if (post.user.toString() !== id && !isAdmin) return next(new CustomError('Forbidden', 403));

    await post.delete();

    res.status(204).json({
      status: 'success',
      message: 'Post deleted'
    });
  } catch (e) {
    next(e);
  }
};

export const toggleLike = async (
  req: Request<PostByIdInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!MongoTypes.ObjectId.isValid(req.params.id))
      return next(new CustomError('Invalid id', 400));

    const { _id: id } = res.locals.user;

    const likes = await postModel.findOneAndUpdate(
      { _id: req.params.id },
      [
        {
          $set: {
            likes: {
              $cond: [
                { $in: [res.locals.user._id, '$likes'] },
                { $setDifference: ['$likes', [id]] },
                { $concatArrays: ['$likes', [id]] }
              ]
            }
          }
        }
      ],
      {
        new: true,
        projection: {
          isLiked: { $in: [id, '$likes'] },
          likesCount: { $size: '$likes' }
        }
      }
    );

    if (!likes) return next(new CustomError('Post not found', 400));

    res.status(200).json({
      status: 'success',
      likes
    });
  } catch (e) {
    next(e);
  }
};
