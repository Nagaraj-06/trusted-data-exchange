import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        credentials: 'include', // Needed for httpOnly cookies
    }),
    tagTypes: ['User', 'Records', 'Institutions', 'Students'],
    endpoints: () => ({}),
});
