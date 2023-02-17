export interface GenericResponse {
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
  id: number;
  status: FriendStatus;
}

export interface GenericProfile {
  id: number;
  name: string;
  lastname: string;
  avatar: string | null;
  isAdmin?: boolean;
  isOwn?: boolean;
  friendStatus: FriendStatus;
  about: {
    age?: number;
    status?: string;
    interests?: string;
    work?: string;
  };
}

export interface UserPost {
  id: number;
  image: null | string;
  text: string;
  date: number;
  userId: number;
}

export interface GenericPost extends UserPost {
  name: string;
  avatar: null | string;
}

export type FriendProfile = Omit<GenericProfile, 'friendStatus'>;

export enum FriendRequestActions {
  request = 'request',
  approve = 'approve',
  delete = 'delete'
}

export interface FriendRequest {
  id: number;
  action: FriendRequestActions;
}

export interface Conversation {
  id: number;
  name: string;
  avatar: null | string;
  online: boolean;
  unreadCount: number;
  lastUpdate: number;
  lastMessage: string;
}

export interface Message {
  date: number;
  text: string;
  image: string | null;
  userId: number;
  conversationId: number;
  own?: boolean;
}
