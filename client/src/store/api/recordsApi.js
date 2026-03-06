import { baseApi } from './baseApi';

export const recordsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecords: builder.query({
            query: () => '/private/api/records',
            providesTags: ['Records'],
        }),
        issueRecord: builder.mutation({
            query: (data) => ({
                url: '/private/api/records',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Records'],
        }),
        updateRecordStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/private/api/records/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Records'],
        }),
        createShareLink: builder.mutation({
            query: (data) => ({
                url: '/private/api/share',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ShareLinks'],
        }),
        getShareLinks: builder.query({
            query: () => '/private/api/share',
            providesTags: ['ShareLinks'],
        }),
        revokeShareLink: builder.mutation({
            query: (id) => ({
                url: `/private/api/share/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ShareLinks'],
        }),
        bulkIssueRecords: builder.mutation({
            query: (records) => ({
                url: '/private/api/records/bulk',
                method: 'POST',
                body: { records },
            }),
            invalidatesTags: ['Records'],
        }),
        verifyRecord: builder.query({
            query: (token) => `/public/api/verify/${token}`,
        }),
    }),
});

export const {
    useGetRecordsQuery,
    useIssueRecordMutation,
    useBulkIssueRecordsMutation,
    useUpdateRecordStatusMutation,
    useCreateShareLinkMutation,
    useGetShareLinksQuery,
    useRevokeShareLinkMutation,
    useVerifyRecordQuery,
} = recordsApi;
