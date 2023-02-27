import { snack } from '../../../components/Common/SnackbarMassege';
import { apiSlice } from '../apiSlice';
import { socket } from './socket';
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
      providesTags: ['Friends'],
      async onCacheEntryAdded(arg, { cacheDataLoaded, cacheEntryRemoved, dispatch }) {
        const handleStatusChange = async (data: {
          id: string;
          status: FriendStatus;
          name: string;
        }) => {
          dispatch(
            friendsService.util.invalidateTags(['Friends', { type: 'Profile', id: data.id }])
          );
          if (arg === FriendStatus.pending) {
            if (data.status === FriendStatus.requested)
              snack.info([data.name, 'friendLng.requestedNotification']);
            if (data.status === FriendStatus.accepted)
              snack.info([data.name, 'friendLng.acceptedNotification']);
          }
        };

        try {
          await cacheDataLoaded;
          socket.on('friendStatus', handleStatusChange);
          // eslint-disable-next-line prettier/prettier
        } catch {}

        await cacheEntryRemoved;
        socket.off('friendStatus', handleStatusChange);
      }
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
