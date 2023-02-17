import { apiSlice } from '../apiSlice';
import { GenericProfile, UserProfile } from './types';

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOwnProfile: builder.query<UserProfile, void>({
      query() {
        return {
          url: '/profile'
        };
      },
      providesTags: ['Profile']
    }),
    updateOwnProfile: builder.mutation<UserProfile, FormData>({
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
