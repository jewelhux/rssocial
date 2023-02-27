import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.SERVER_API_URL}/api`,
    credentials: 'include'
  }),
  tagTypes: ['Profile', 'Post', 'Friends', 'Login', 'Conversations', 'Messages'],
  endpoints: () => ({})
});
