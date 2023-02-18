import { NextFunction, Request, Response } from 'express';
import { AddPostInput, DeletePostInput } from '../schemas/post.schema';
import { User } from '../models/user.model';
import postModel from '../models/post.model';
import CustomError from '../util/customError';

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await postModel.find().populate<{ user: User }>('user').lean();
    const posts = data.map((post) => {
      const { user, ...rest } = post;
      return {
        ...rest,
        userId: user.id,
        avatar: user.avatar,
        name: `${user.name} ${user.lastname}`
      };
    });
    res.status(200).json({
      status: 'success',
      posts
    });
  } catch (e) {
    next(e);
  }
};

export const getPostsByUser = async (
  req: Request<object, object, object, { id?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.query.id || res.locals.user.id;
    const posts = await postModel.find({ user: id });
    res.status(200).json({
      status: 'success',
      posts: { posts }
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
  req: Request<DeletePostInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, isAdmin } = res.locals.user;

    const post = await postModel.findById(req.params.id);
    if (!post) return next(new CustomError('Not found', 404));
    if (post.user.toString() !== id && !isAdmin) return next(new CustomError('Forbidden', 403));

    post.delete();

    res.status(204).json({
      status: 'success',
      message: 'Post deleted'
    });
  } catch (e) {
    next(e);
  }
};
