import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com'
    }),
    endpoints: (builder) => ({

        login: builder.mutation({
            query: (credentials) => ({
                url: "user/login",
                method: "Post",
                body: credentials
            }),
        }),
        addTodos:builder.mutation({
            query: (data)=>({
                url: "/todos/add",
                method:"POST",
                body: data,
            })
        }),

        getTodos: builder.query({
            query: (userID) => `/todos/user/${userID}`,
        }),

        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            })
        }),

        updateTodo: builder.mutation({
            query: ({ id, completed }) => ({
                url: `todos/${id}`,
                method: "PUT", // PATCH o dewa jabe
                body: JSON.stringify({
                    completed
                })
            }),
        })

    })
})

export const { useLoginMutation, useGetTodosQuery, useDeleteTodoMutation, useUpdateTodoMutation,
    useAddTodosMutation
 } = api;

export default api;
