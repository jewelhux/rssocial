import { NextFunction, Request, Response } from 'express';
import { Socket } from 'socket.io';
import { Types as MongoTypes } from 'mongoose';
import conversationModel from '../models/conversation.model';
import userModel from '../models/user.model';
import { GetMessagesInput, SendMessageInput } from '../schemas/chat.schema';
import CustomError from '../util/customError';
import { CustomRequest } from '../types/types';

export const getConversations = async (
  req: Request<object, object, object, { newchat?: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { io } = req as CustomRequest;
    let conversations = await conversationModel.aggregate([
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
    conversations = conversations.map((convo) => {
      return { ...convo, online: Boolean(io.sockets.adapter.rooms.get(convo.id.toString())) };
    });

    const { newchat } = req.query;

    if (
      newchat &&
      newchat !== res.locals.user._id.toString() &&
      !conversations.some((conv) => conv.id.toString() === req.query.newchat)
    ) {
      const newChatProfile = await userModel.findById(req.query.newchat);
      if (newChatProfile) {
        conversations.push({
          id: newChatProfile.id,
          name: `${newChatProfile.name} ${newChatProfile.lastname}`,
          avatar: newChatProfile.avatar,
          lastMessage: '',
          updatedAt: new Date(),
          unreadCount: 0,
          online: Boolean(io.sockets.adapter.rooms.get(newChatProfile._id.toString()))
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
    const { io } = req as CustomRequest;
    const profile = await userModel.findById(req.body.profile);
    if (!profile) return next(new CustomError('Profile not found', 404));

    const conversation = await conversationModel
      .findOneAndUpdate(
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
              text: req.body.text,
              image: req.body.image
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
      )
      .lean();

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
      const message = { ...conversation.value?.messages[0], conversationId: res.locals.user._id };
      io.to(profile._id.toString()).emit('newMessage', message);
    } else {
      const conv = {
        id: res.locals.user._id,
        name: `${res.locals.user.name} ${res.locals.user.lastname}`,
        avatar: res.locals.user.avatar,
        lastMessage: conversation.value?.messages[0].text,
        unreadCount: 1,
        updatedAt: new Date(),
        online: Boolean(io.sockets.adapter.rooms.get(profile._id.toString()))
      };
      io.to(profile._id.toString()).emit('addConversation', conv);
    }

    const message = { ...conversation.value?.messages[0], conversationId: profile._id };
    io.to(res.locals.user._id.toString()).emit('newMessage', {
      ...message,
      conversationId: profile._id,
      own: true
    });

    return res.status(200).json({ status: 'success', message });
  } catch (e) {
    next(e);
  }
};

export const reportRead = async (socket: Socket, profile: string) => {
  try {
    const response = await conversationModel.aggregate([
      {
        $match: {
          $or: [
            {
              'participants.user': {
                $all: [
                  new MongoTypes.ObjectId(profile),
                  new MongoTypes.ObjectId(socket.handshake.auth.user)
                ]
              }
            },
            {
              'participants.user': {
                $all: [
                  new MongoTypes.ObjectId(socket.handshake.auth.user),
                  new MongoTypes.ObjectId(profile)
                ]
              }
            }
          ]
        }
      },
      {
        $project: {
          _id: 1,
          count: { $size: '$messages' }
        }
      }
    ]);

    const update = await conversationModel.updateOne(
      {
        _id: response[0]._id
      },
      {
        $set: {
          'participants.$[elem].index': response[0].count
        }
      },
      {
        arrayFilters: [{ 'elem.user': socket.handshake.auth.user }]
      }
    );

    if (update.modifiedCount) socket.emit('updateRead', profile);
  } catch (e) {
    console.log('error reporting read', e);
  }
};
