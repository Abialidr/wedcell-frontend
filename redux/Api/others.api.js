import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const otherApi = createApi({
  reducerPath: "otherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PROXY}`,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("wedfield"))
        ? JSON.parse(localStorage.getItem("wedfield"))?.data?.token
        : "";
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["blogs", "s3buc", "student", "checkout"],
  endpoints: (builder) => ({
    checkUser: builder.query({
      query: () => "/",
      // providesTags: ['other'],
    }),
    deletes3Image: builder.mutation({
      query: (body) => ({
        url: `/awsS3/deleteImage`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["s3buc"],
    }),
    getAllBlogs: builder.query({
      query: () => "/blog/getAll",
      providesTags: ["blogs"],
    }),
    getBlog: builder.query({
      query: (id) => `/blog/getBlog/${id}`,
      providesTags: ["blogs"],
    }),
    getoneStudent: builder.query({
      query: (id) => `/student/getone/${id}`,
      providesTags: ["student"],
    }),
    checkOut: builder.mutation({
      query: (body) => ({
        url: `/api/v1/checkoutOg`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["checkout"],
    }),
    checkOutKey: builder.query({
      query: () => `/api/v1/get-key-id`,
      providesTags: ["checkout"],
    }),
    deleteMe: builder.mutation({
      query: () => ({
        url: `/customers/delete`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCheckUserQuery,
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useDeletes3ImageMutation,
  useGetoneStudentQuery,
  useCheckOutKeyQuery,
  useCheckOutMutation,
  useDeleteMeMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = otherApi;
export const { checkUser, getAllBlogs, getBlog, deletes3Image, getoneStudent } =
  otherApi.endpoints;
