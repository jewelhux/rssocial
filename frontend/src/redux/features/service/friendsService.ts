import { apiSlice } from '../apiSlice';
import { FriendProfile, FriendStatus, FriendRequest, GenericResponse } from './types';

export const friendsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFriends: builder.query<{ friends: FriendProfile[] }, FriendStatus>({
      query(type) {
        return {
          url: '/friends',
          params: { type }
        };
      },
      providesTags: ['Friends']
    }),
    friendRequest: builder.mutation<GenericResponse, FriendRequest>({
      query(body) {
        return {
          url: '/friends',
          method: 'POST',
          body
        };
      },
      invalidatesTags: (result, error, arg) => ['Friends', { type: 'Profile', id: arg.id }]
    })
  })
});

export const { useGetFriendsQuery, useFriendRequestMutation } = friendsService;
