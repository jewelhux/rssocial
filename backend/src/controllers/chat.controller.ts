import { NextFunction, Request, Response } from 'express';
import conversationModel from '../models/conversation.model';
import userModel from '../models/user.model';
import { GetMessagesInput, SendMessageInput } from '../schemas/chat.schema';
import CustomError from '../util/customError';

export const getConversations = async (
  req: Request<object, object, object, { newChat?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversations = await conversationModel.aggregate([
      {
        $match: {
          'participants.user': res.locals.user._id
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'participants.user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $project: {
          opponent: {
            $filter: {
              input: '$user',
              as: 'u',
              cond: { $ne: ['$$u._id', res.locals.user._id] }
            }
          },
          user: {
            $filter: {
              input: '$participants',
              as: 'p',
              cond: { $eq: ['$$p.user', res.locals.user._id] }
            }
          },
          updatedAt: 1,
          count: { $size: '$messages' },
          last: { $last: '$messages' }
        }
      },
      { $unwind: '$user' },
      { $unwind: '$opponent' },
      {
        $project: {
          _id: 0,
          id: '$opponent._id',
          name: { $concat: ['$opponent.name', ' ', '$opponent.lastname'] },
          avatar: '$opponent.avatar',
          lastMessage: { $ifNull: ['$last.text', ''] },
          updatedAt: 1,
          unreadCount: { $subtract: ['$count', '$user.index'] }
        }
      }
    ]);

    const { newChat } = req.query;

    if (
      newChat &&
      newChat !== res.locals.user._id.toString() &&
      !conversations.some((conv) => conv.id === req.query.newChat)
    ) {
      const newChatProfile = await userModel.findById(req.query.newChat);
      if (newChatProfile) {
        conversations.unshift({
          id: newChatProfile.id,
          name: `${newChatProfile.name} ${newChatProfile.lastname}`,
          avatar: newChatProfile.avatar,
          lastMessage: '',
          updatedAt: new Date(),
          unreadCount: 0
        });
      }
    }
    return res.status(200).json({ status: 'success', conversations });
  } catch (e) {
    next(e);
  }
};

export const getMessages = async (
  req: Request<object, object, object, GetMessagesInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const conversation = await conversationModel.findOne(
      {
        $or: [
          { 'participants.user': { $all: [res.locals.user._id, req.query.profile] } },
          { 'participants.user': { $all: [req.query.profile, res.locals.user._id] } }
        ]
      },
      { messages: 1 }
    );

    return res.status(200).json({ status: 'success', messages: conversation?.messages ?? [] });
  } catch (e) {
    next(e);
  }
};

export const sendMessage = async (
  req: Request<SendMessageInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await userModel.findById(req.body.profile);
    if (!profile) return next(new CustomError('Profile not found', 404));

    const conversation = await conversationModel.findOneAndUpdate(
      {
        $or: [
          { 'participants.user': { $all: [res.locals.user._id, profile._id] } },
          { 'participants.user': { $all: [profile._id, res.locals.user._id] } }
        ]
      },
      {
        $push: {
          messages: {
            user: res.locals.user._id,
            text: req.body.text
          }
        },
        $setOnInsert: {
          participants: [{ user: res.locals.user._id }, { user: profile._id }]
        }
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        rawResult: true,
        projection: { messages: { $slice: -1 } }
      }
    );

    await conversationModel.updateOne(
      {
        _id: conversation.value?._id,
        'participants.user': res.locals.user._id
      },
      {
        $inc: { 'participants.$.index': 1 }
      }
    );

    if (conversation.lastErrorObject?.updatedExisting) {
      console.log(conversation.value?.messages[0]);
    } else {
      console.log({
        id: res.locals.user._id,
        name: `${res.locals.user.name} ${res.locals.user.lastname}`,
        avatar: res.locals.user.avatar,
        lastMessage: conversation.value?.messages[0].text,
        unreadCount: 1,
        updatedAt: new Date(),
        online: true
      });
    }

    return res.status(200).json({ status: 'success', message: 'Message sent' });
  } catch (e) {
    next(e);
  }
};
