import { apiSlice } from '../apiSlice';
import { UserPost, GenericPost } from './types';

export const postsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<{ posts: UserPost[] }, number | void>({
      query(id) {
        return {
          url: '/posts',
          params: { id }
        };
      },
      providesTags: ['Post']
    }),
    getAllPosts: builder.query<{ posts: GenericPost[] }, void>({
      query() {
        return {
          url: '/posts/all'
        };
      },
      providesTags: ['Post']
    }),
    addPost: builder.mutation<UserPost, FormData>({
      query(data) {
        return {
          url: '/posts',
          method: 'POST',
          body: data
        };
      },
      invalidatesTags: ['Post']
    }),
    deletePostById: builder.mutation<void, number>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Post']
    })
  })
});

export const {
  useAddPostMutation,
  useDeletePostByIdMutation,
  useGetAllPostsQuery,
  useGetUserPostsQuery
} = postsService;
