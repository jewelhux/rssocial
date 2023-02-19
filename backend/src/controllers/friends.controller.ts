import { NextFunction, Request, Response } from 'express';
import { FilterQuery } from 'mongoose';
import friendshipModel, { Friendship } from '../models/friends.model';
import { FriendRequestInput, GetFriendsInput, FriendStatus } from '../schemas/friends.schema';
import CustomError from '../util/customError';

export const getFriends = async (
  req: Request<object, object, object, GetFriendsInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = res.locals.user;
    const status = req.query.type;
    let query: FilterQuery<Friendship>;

    if (status === FriendStatus.ACCEPTED) {
      query = {
        $and: [{ status: FriendStatus.ACCEPTED }, { $or: [{ requester: id }, { requestee: id }] }]
      };
    } else if (status === FriendStatus.PENDING) {
      query = {
        $and: [{ status: FriendStatus.PENDING }, { requestee: id }]
      };
    } else {
      query = {
        $and: [{ status: FriendStatus.PENDING }, { requester: id }]
      };
    }

    const friends = (
      await friendshipModel
        .find(query)
        .populate({ path: 'requestee', match: { _id: { $ne: id } } })
        .populate({ path: 'requester', match: { _id: { $ne: id } } })
        .lean()
    ).map((friend) => (friend.requestee ? friend.requestee : friend.requester));

    return res.status(200).json({ status: 'success', friends });
  } catch (e) {
    next(e);
  }
};

export const friendRequest = async (
  req: Request<object, object, FriendRequestInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id;
    const { id: targetId, action } = req.body;

    const existingFriendship = await friendshipModel.findOne({
      $or: [
        { requester: userId, requestee: targetId },
        { requester: targetId, requestee: userId }
      ]
    });

    if (action === 'request') {
      if (existingFriendship)
        return next(new CustomError('Either already friends or already requsted', 400));
      await friendshipModel.create({
        requester: userId,
        requestee: targetId,
        status: FriendStatus.PENDING
      });
      return res.status(200).json({ status: 'success', message: 'Request sent' });
    }

    if (action === 'approve') {
      if (!existingFriendship) return next(new CustomError('No request to approve', 400));
      if (existingFriendship.status === FriendStatus.ACCEPTED)
        return next(new CustomError('Already a friend', 400));
      if (!existingFriendship.requestee.equals(userId))
        return next(new CustomError('You cannot approve your own request', 400));

      existingFriendship.status = FriendStatus.ACCEPTED;
      await existingFriendship.save();
      return res.status(200).json({ status: 'success', message: 'Request approved' });
    }

    if (!existingFriendship) return next(new CustomError('No request to delete', 400));
    await existingFriendship.delete();
    return res.status(200).json({ status: 'success', message: 'Request deleted' });
  } catch (e) {
    next(e);
  }
};
