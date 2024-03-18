import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from '../../domain/entities/post_entity';

export const postApis = createApi({
    reducerPath: 'postApis',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),
    endpoints: (builder) => ({
        getAllPost: builder.query<IPost[], void>({
            query: () => ({
                url: 'posts',
                method: 'GET'
            }),
        }),
        getPostById: builder.query<IPost, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET'
            })
        }),
        addPost: builder.mutation<IPost, any>({
            query: (body) => ({
                url: 'posts',
                method: 'POST',
                body: body
            })
        }),
        updatePostById: builder.mutation<IPost, { id: string, body: Partial<IPost> }>({
            query: ({ id, body }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: body
            })
        }),
        deletePostById: builder.mutation<IPost, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',

            })
        })
    })

});

export const { useGetAllPostQuery, useGetPostByIdQuery, useUpdatePostByIdMutation, useDeletePostByIdMutation, useAddPostMutation } = postApis;