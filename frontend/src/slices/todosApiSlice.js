import { apiSlice } from './apiSlice'
const TODOS_URL = '/api/todo'

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasks: builder.mutation({
      query: () => ({
        url: `${TODOS_URL}`,
        method: 'GET',
      }),
    }),
    postNewTask: builder.mutation({
      query: (data) => ({
        url: `${TODOS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TODOS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetAllTasksMutation,
  usePostNewTaskMutation,
  useDeleteTaskMutation,
} = todoApiSlice
