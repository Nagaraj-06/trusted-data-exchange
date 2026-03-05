import { baseApi } from './baseApi';

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminStats: builder.query({
            query: () => '/private/api/admin/stats',
            providesTags: ['AdminStats'],
        }),
        getInstitutions: builder.query({
            query: () => '/private/api/admin/institutions',
            providesTags: ['Institutions'],
        }),
        createInstitution: builder.mutation({
            query: (data) => ({
                url: '/private/api/admin/institutions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Institutions', 'AdminStats'],
        }),
        updateInstitutionStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/private/api/admin/institutions/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Institutions', 'AdminStats'],
        }),
        getAuditLogs: builder.query({
            query: (params) => ({
                url: '/private/api/admin/audit-logs',
                params,
            }),
            providesTags: ['AuditLogs'],
        }),
        linkUserToInstitution: builder.mutation({
            query: (data) => ({
                url: '/private/api/admin/link-user',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Institutions'],
        }),
    }),
});

export const {
    useGetAdminStatsQuery,
    useGetInstitutionsQuery,
    useCreateInstitutionMutation,
    useUpdateInstitutionStatusMutation,
    useGetAuditLogsQuery,
    useLinkUserToInstitutionMutation,
} = adminApi;
