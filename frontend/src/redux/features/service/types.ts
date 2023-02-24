export interface GenericResponse {
  status: string;
  message: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegistrationInput {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export enum FriendStatus {
  accepted = 'accepted',
  pending = 'pending',
  requested = 'requested',
  none = 'none'
}

export interface Friend {
  id: string;
  status: FriendStatus;
}

export interface GenericProfile {
  id: string;
  name: string;
  lastname: string;
  avatar: string;
  isAdmin?: boolean;
  isOwn?: boolean;
  friendStatus: FriendStatus;
  age?: number;
  relationship?: string;
  interests?: string;
  work?: string;
}

export interface UserPost {
  id: string;
  image: string;
  text: string;
  createdAt: string;
  user: string;
}

export interface GenericPost extends UserPost {
  name: string;
  avatar: string;
}

export type FriendProfile = Omit<GenericProfile, 'friendStatus'>;

export enum FriendRequestActions {
  request = 'request',
  approve = 'approve',
  delete = 'delete'
}

export interface FriendRequest {
  id: string;
  action: FriendRequestActions;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
  unreadCount: number;
  updatedAt: string;
  lastMessage: string;
}

export interface Message {
  createdAt: string;
  text: string;
  image: string;
  user: string;
  conversationId?: string;
  own?: boolean;
}
