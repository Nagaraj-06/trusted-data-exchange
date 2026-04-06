import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        credentials: 'include', // Needed for httpOnly cookies
    }),
    tagTypes: ['User', 'Records', 'Institutions', 'Students'],
    endpoints: () => ({}),
});
