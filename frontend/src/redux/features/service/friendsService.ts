import { apiSlice } from '../apiSlice';
import { FriendProfile, FriendStatus, FriendRequest, GenericResponse } from './types';

const friendsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<{ friends: FriendProfile[] }, FriendStatus>({
      query(type) {
        return {
          url: '/friends',
          params: { type }
        };
      }
    }),
    friendRequest: builder.mutation<GenericResponse, FriendRequest>({
      query(body) {
        return {
          url: '/friends',
          method: 'POST',
          body
        };
      }
    })
  })
});

export const { useGetFriendsQuery, useFriendRequestMutation } = friendsService;
