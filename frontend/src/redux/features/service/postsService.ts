import { PatchCollection } from '@reduxjs/toolkit/dist/query/core/buildThunks';
import { apiSlice } from '../apiSlice';
import { UserPost, GenericPost, PostLikes } from './types';

export const postsService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserPosts: builder.query<{ posts: UserPost[] }, string | void>({
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
      transformResponse: (res: { post: UserPost }) => res.post,
      invalidatesTags: ['Post']
    }),
    deletePostById: builder.mutation<void, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: ['Post']
    }),
    toggleLike: builder.mutation<{ likes: PostLikes }, string>({
      query(id) {
        return {
          url: `/posts/${id}`,
          method: 'PATCH'
        };
      },
      async onQueryStarted(id, { dispatch, queryFulfilled, getState }) {
        const updateLikes = (likesCount?: number, isLiked?: boolean) => {
          const postsCache = postsService.util.selectInvalidatedBy(getState(), ['Post']);
          const patches: PatchCollection[] = [];
          for (const { endpointName, originalArgs } of postsCache) {
            if (endpointName !== 'getUserPosts' && endpointName !== 'getAllPosts') continue;
            patches.push(
              dispatch(
                postsService.util.updateQueryData(endpointName, originalArgs, (draft) => {
                  const post = draft.posts.find((el) => el.id === id);
                  if (post) {
                    post.isLiked = isLiked !== undefined ? isLiked : !post.isLiked;
                    if (likesCount !== undefined) post.likesCount = likesCount;
                  }
                })
              )
            );
          }
          return patches;
        };

        const patches = updateLikes();
        try {
          const result = await queryFulfilled;
          updateLikes(result.data.likes.likesCount, result.data.likes.isLiked);
        } catch {
          patches.forEach((patch) => patch.undo());
        }
      }
    })
  })
});

export const {
  useAddPostMutation,
  useDeletePostByIdMutation,
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useToggleLikeMutation
} = postsService;
