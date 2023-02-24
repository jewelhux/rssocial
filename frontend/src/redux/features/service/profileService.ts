import { apiSlice } from '../apiSlice';
import { GenericProfile } from './types';

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<GenericProfile, string | void>({
      query(id) {
        return {
          url: '/profile',
          params: { id }
        };
      },
      transformResponse: (res: { profile: GenericProfile }) => res.profile,
      providesTags: (result, error, arg) =>
        arg ? [{ type: 'Profile', id: arg }, 'Profile'] : ['Profile']
    }),
    updateOwnProfile: builder.mutation<GenericProfile, FormData>({
      query(data) {
        return {
          url: '/profile',
          method: 'PUT',
          body: data
        };
      },
      transformResponse: (res: { profile: GenericProfile }) => res.profile,
      invalidatesTags: ['Profile']
    }),
    getAllProfiles: builder.query<{ profiles: GenericProfile[] }, string | void>({
      query(q) {
        return {
          url: '/profile/all',
          params: { q }
        };
      }
    })
  })
});

export const { useGetProfileQuery, useGetAllProfilesQuery, useUpdateOwnProfileMutation } =
  profileService;
