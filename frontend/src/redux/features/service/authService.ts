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
      }
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
      }
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
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authService;
