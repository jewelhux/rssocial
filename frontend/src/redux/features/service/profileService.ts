import { apiSlice } from '../apiSlice';
import { GenericProfile, UserProfile } from './types';

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnProfile: builder.query<UserProfile, void>({
      query() {
        return {
          url: '/profile'
        };
      }
    }),
    updateOwnProfile: builder.mutation<UserProfile, FormData>({
      query(data) {
        return {
          url: '/profile',
          method: 'PUT',
          body: data
        };
      }
    }),
    getAllProfiles: builder.query<{ users: GenericProfile[] }, void>({
      query() {
        return {
          url: '/profile/all'
        };
      }
    }),
    getProfileById: builder.query<GenericProfile, number>({
      query(id) {
        return {
          url: `/profile/${id}`
        };
      }
    })
  })
});

export const {
  useGetOwnProfileQuery,
  useGetAllProfilesQuery,
  useGetProfileByIdQuery,
  useUpdateOwnProfileMutation
} = profileService;
