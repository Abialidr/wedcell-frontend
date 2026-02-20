import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";

export const venueApi = createApi({
  reducerPath: "venueApi",
  baseQuery: fetchBaseQuery({
    baseUrl: PROXY,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("wedfield"))?.data?.token
        ? JSON.parse(localStorage.getItem("wedfield"))?.data?.token
        : "";
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    userToken: builder.query({
      query: () => "/token",
      providesTags: ["User"],
    }),
    userLogin: builder.mutation({
      query: (User) => ({
        url: "/login",
        method: "POST",
        body: User,
      }),
      invalidatesTags: ["User"],
    }),
    userChangePhone: builder.mutation({
      query: (data) => ({
        url: "/user/change-phone",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    userDelete: builder.mutation({
      query: ({ id, data }) => ({
        url: "/enterprise/delete-user/${id}",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // ====================================
  }),
});

// export const {} = venueApi;
