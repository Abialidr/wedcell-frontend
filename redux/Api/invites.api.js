import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const invitesApi = createApi({
  reducerPath: "invitesApi",
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
  tagTypes: ["invites"],
  endpoints: (builder) => ({
    getInvitesData: builder.query({
      query: () => `/invite`,
      providesTags: ["invites"],
    }),
    getInvitesDataByID: builder.query({
      query: (id) => `/invite/getById/${id}`,
      providesTags: ["invites"],
    }),
    getFamilyDataByID: builder.query({
      query: (id) => `/invite/getByFamilyId/${id}`,
      providesTags: ["invites"],
    }),
    inviteUpdate: builder.mutation({
      query: (body) => ({
        url: `/invite/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["invites"],
    }),
    inviteImgUpload: builder.mutation({
      query: (body) => ({
        url: `/inviteImg/upload`,
        method: "PUT",
        body: body,
      }),
    }),
    inviteImgDelete: builder.mutation({
      query: (id) => ({
        url: `/inviteImg/${id}`,
        method: "DELETE",
      }),
    }),
    getComponent: builder.query({
      query: () => `/adminessentials/component`,
      providesTags: ["invites"],
    }),
    getInviteText: builder.query({
      query: ({ type, Subtype }) =>
        `/inviteText?type=${type}${
          Subtype !== undefined ? `&&Subtype=${Subtype}` : ""
        }`,
      providesTags: ["invites"],
    }),
    getInviteTemplates: builder.query({
      query: (page) => `/template?page=${page}`,
      providesTags: ["invites"],
    }),
    getSingleInviteTemplates: builder.query({
      query: (id) => `/template/${id}`,
      providesTags: ["invites"],
    }),
    getInviteUserImg: builder.query({
      query: () => `/inviteImg`,
      providesTags: ["invites"],
    }),
    getInviteImg: builder.query({
      query: ({ selectedtype, selectedSubtype }) =>
        `/inviteImg/getAdmin?type=${selectedtype}${
          selectedSubtype !== undefined ? `&&Subtype=${selectedSubtype}` : ""
        }`,
      providesTags: ["invites"],
    }),
  }),
});

export const {
  useGetInvitesDataQuery,
  useInviteUpdateMutation,
  useGetInvitesDataByIDQuery,
  useGetFamilyDataByIDQuery,
  useGetComponentQuery,
  useGetInviteImgQuery,
  useGetInviteTextQuery,
  useGetInviteTemplatesQuery,
  useGetInviteUserImgQuery,
  useInviteImgUploadMutation,
  useInviteImgDeleteMutation,
  useGetSingleInviteTemplatesQuery,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = invitesApi;
export const {
  getInvitesData,
  inviteUpdate,
  getInvitesDataByID,
  getFamilyDataByID,
  getComponent,
  getInviteImg,
  getInviteText,
  getInviteTemplates,
  getInviteUserImg,
  inviteImgUpload,
  inviteImgDelete,
  getSingleInviteTemplates,
} = invitesApi.endpoints;
