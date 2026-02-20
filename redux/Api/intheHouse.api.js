import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const intheHouseApi = createApi({
  reducerPath: "intheHouseApi",
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
  tagTypes: ["inhouse"],
  endpoints: (builder) => ({
    getForAllInhouse: builder.query({
      query: (values) => `/adminessentials/${values}`,
      providesTags: ["inhouse"],
    }),
    createInhouseforOthers: builder.mutation({
      query: (body) => ({
        url: `/inhouse/other`,
        method: "POST",
        body: body,
      }),
    }),
    createOppforOthers: builder.mutation({
      query: (body) => ({
        url: `/opp/other`,
        method: "POST",
        body: body,
      }),
    }),
    createInhouseforvenue: builder.mutation({
      query: (body) => ({
        url: `/inhouse/venue`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetForAllInhouseQuery,
  useCreateInhouseforOthersMutation,
  useCreateOppforOthersMutation,
  useCreateInhouseforvenueMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = intheHouseApi;
export const { getFamilyData, familyDelete, inviteUpdate } =
  intheHouseApi.endpoints;
