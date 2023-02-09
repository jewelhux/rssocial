import { apiSlice } from '../apiSlice';
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
      }
    }),
    login: builder.mutation<GenericResponse, LoginInput>({
      query(data) {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data
        };
      }
    }),
    logout: builder.mutation<GenericResponse, void>({
      query() {
        return {
          url: '/auth/logout',
          method: 'POST'
        };
      }
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authService;
