import { baseApi } from "./baseApi";

export const institutionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        bulkCreateStudents: builder.mutation({
            query: (students) => ({
                url: '/private/api/institutions/students/bulk',
                method: 'POST',
                body: { students },
            }),
            invalidatesTags: ['Students'],
        }),
        getStudents: builder.query({
            query: () => '/private/api/institutions/students',
            providesTags: ['Students'],
        }),
    }),
});

export const {
    useBulkCreateStudentsMutation,
    useGetStudentsQuery,
} = institutionApi;
