import { object, string, TypeOf, enum as zodEnum } from 'zod';

export enum FriendStatus {
  ACCEPTED = 'accepted',
  PENDING = 'pending',
  NONE = 'none',
  REQUESTED = 'requested'
}

export const friendRequestSchema = object({
  body: object({
    id: string(),
    action: zodEnum(['request', 'approve', 'delete'])
  })
});

export const getFriendsSchema = object({
  query: object({
    type: zodEnum([FriendStatus.ACCEPTED, FriendStatus.PENDING, FriendStatus.REQUESTED])
  })
});

export type FriendRequestInput = TypeOf<typeof friendRequestSchema>['body'];
export type GetFriendsInput = TypeOf<typeof getFriendsSchema>['query'];
