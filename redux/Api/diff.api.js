import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const diffApi = createApi({
  reducerPath: "diffApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api-gilt-one.vercel.app`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["guest"],
  endpoints: (builder) => ({
    getFontByLidos: builder.query({
      query: (values) => `/fonts?${values}`,
      providesTags: ["guest"],
    }),
    getElements: builder.query({
      query: (values) => `/${values}`,
      providesTags: ["guest"],
    }),
  }),
});

export const {
  useGetFontByLidosQuery,
  useGetElementsQuery,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = diffApi;
export const { getFamilyData, familyDelete, inviteUpdate } = diffApi.endpoints;
