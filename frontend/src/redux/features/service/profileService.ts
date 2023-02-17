import { apiSlice } from '../apiSlice';
import { GenericProfile } from './types';

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GenericProfile, number | void>({
      query(id) {
        return {
          url: '/profile',
          params: { id }
        };
      },
      providesTags: (result, error, arg) =>
        typeof arg === 'number' ? [{ type: 'Profile', id: arg }, 'Profile'] : ['Profile']
    }),
    updateOwnProfile: builder.mutation<GenericProfile, FormData>({
      query(data) {
        return {
          url: '/profile',
          method: 'PUT',
          body: data
        };
      },
      invalidatesTags: ['Profile']
    }),
    getAllProfiles: builder.query<{ users: GenericProfile[] }, string | void>({
      query(search) {
        return {
          url: '/profile/all',
          params: { search }
        };
      }
    })
  })
});

export const { useGetProfileQuery, useGetAllProfilesQuery, useUpdateOwnProfileMutation } =
  profileService;
