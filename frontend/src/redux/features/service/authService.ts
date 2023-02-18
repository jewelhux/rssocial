/* eslint-disable prettier/prettier */
import { getCookie } from 'typescript-cookie';
import { apiSlice } from '../apiSlice';
import { socket } from './socket';
import { GenericResponse, LoginInput, RegistrationInput } from './types';

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<GenericResponse, RegistrationInput>({
      query(data) {
        return {
          url: '/auth/register',
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          socket.connect();
        } catch {}
      },
      invalidatesTags: ['Login', 'Chat', 'Friends', 'Post', 'Profile']
    }),
    login: builder.mutation<GenericResponse, LoginInput>({
      query(data) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          socket.connect();
        } catch {}
      },
      invalidatesTags: ['Login', 'Chat', 'Friends', 'Post', 'Profile']
    }),
    logout: builder.mutation<GenericResponse, void>({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST'
        };
      },
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          socket.disconnect();
        } catch {}
      },
      invalidatesTags: ['Login']
    }),
    loginCheck: builder.query<boolean, void>({
      queryFn: () => {
        return { data: getCookie('logged_in') === 'true' };
      },
      providesTags: ['Login']
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useLoginCheckQuery } =
  authService;
