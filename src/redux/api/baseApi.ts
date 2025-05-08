import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getSession } from 'next-auth/react';
// import { toast } from 'react-toastify';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`,
    credentials: 'include',
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;

      if (!token) {
        // toast.error('You are not logged in!');
      } else {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Medicine'],
  endpoints: () => ({}),
});
export default baseApi;
