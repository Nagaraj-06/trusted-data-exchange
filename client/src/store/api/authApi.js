import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/public/api/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/public/api/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        googleLogin: builder.mutation({
            query: (idToken) => ({
                url: '/public/api/auth/google',
                method: 'POST',
                body: { idToken },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/public/api/auth/logout',
                method: 'POST',
            }),
        }),
        getMe: builder.query({
            query: () => '/private/api/users/me',
            providesTags: ['User'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGoogleLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi;
