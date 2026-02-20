import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const guestListApi = createApi({
  reducerPath: "guestListApi",
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
  tagTypes: ["guest"],
  endpoints: (builder) => ({
    getFamilyArray: builder.query({
      query: (values) => `/family`,
      providesTags: ["guest"],
    }),
    getFamilyData: builder.query({
      query: (values) => `/family/getFams?id=${values}`,
      providesTags: ["guest"],
    }),
    getGuestAttendance: builder.query({
      query: () => `/guests/getAttendance`,
      providesTags: ["guest"],
    }),
    getGuest: builder.query({
      query: ({ category, type }) =>
        `/guests/get?${
          category.length ? `&&category=${JSON.stringify(category)}` : ""
        }&&type=${type}`,
      providesTags: ["guest"],
    }),
    getEventGuest: builder.query({
      query: (values) => `/guests/getInviteGuest?eventsId=${values}`,
      providesTags: ["guest"],
    }),
    getGuestGenders: builder.query({
      query: () => `/guests/gender`,
      providesTags: ["guest"],
    }),
    getGuestGroup: builder.query({
      query: (arr) =>
        `/guests/groups?${arr.length ? `&&guest=${JSON.stringify(arr)}` : ""}`,
      providesTags: ["guest"],
    }),
    getGuestMenu: builder.query({
      query: (arr) =>
        `/guests/menu?${arr?.length ? `&&menu=${JSON.stringify(arr)}` : ""}`,
      providesTags: ["guest"],
    }),
    getInvitesData: builder.query({
      query: () => `/invite`,
      providesTags: ["guest"],
    }),
    familyCreate: builder.mutation({
      query: (body) => ({
        url: `/family/create`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
    guestAdd: builder.mutation({
      query: (body) => ({
        url: `/guests`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
    guestUpdate: builder.mutation({
      query: (body) => ({
        url: `/guests/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
    guestDelete: builder.mutation({
      query: (id) => ({
        url: `/guests/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["guest"],
    }),
    familyDelete: builder.mutation({
      query: (id) => ({
        url: `/family/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["guest"],
    }),
    inviteUpdate: builder.mutation({
      query: (body) => ({
        url: `/invite/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
    sendInvitetoAllGuests: builder.mutation({
      query: (body) => ({
        url: `/family/sendMessageToAll`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
    sendInviteOneonOneGuests: builder.mutation({
      query: (body) => ({
        url: `/family/sendMessageOneonOne`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["guest"],
    }),
  }),
});

export const {
  useGetFamilyDataQuery,
  useGetEventGuestQuery,
  useGetInvitesDataQuery,
  useFamilyCreateMutation,
  useGuestAddMutation,
  useGuestUpdateMutation,
  useGuestDeleteMutation,
  useFamilyDeleteMutation,
  useInviteUpdateMutation,
  useGetGuestGendersQuery,
  useGetGuestGroupQuery,
  useGetGuestMenuQuery,
  useGetGuestQuery,
  useGetFamilyArrayQuery,
  useGetGuestAttendanceQuery,
  useSendInvitetoAllGuestsMutation,
  useSendInviteOneonOneGuestsMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = guestListApi;
export const {
  guestUpdate,
  guestDelete,
  getFamilyData,
  getEventGuest,
  getInvitesData,
  getGuestGenders,
  getGuestGroup,
  getGuestMenu,
  guestAdd,
  familyCreate,
  getFamilyArray,
  getGuestAttendance,
  familyDelete,
  inviteUpdate,
  sendInvitetoAllGuests,
} = guestListApi.endpoints;
