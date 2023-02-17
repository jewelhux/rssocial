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
      onQueryStarted(arg, { queryFulfilled }) {
        queryFulfilled.then(() => socket.connect());
      },
      invalidatesTags: ['Login']
    }),
    login: builder.mutation<GenericResponse, LoginInput>({
      query(data) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data
        };
      },
      onQueryStarted(arg, { queryFulfilled }) {
        queryFulfilled.then(() => socket.connect());
      },
      invalidatesTags: ['Login']
    }),
    logout: builder.mutation<GenericResponse, void>({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST'
        };
      },
      onQueryStarted(arg, { queryFulfilled, dispatch }) {
        queryFulfilled.then(() => {
          socket.disconnect();
          dispatch(apiSlice.util.resetApiState());
        });
      }
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
