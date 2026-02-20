import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const chwApi = createApi({
  reducerPath: "chwApi",
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
  tagTypes: ["contact", "wishlist", "cart", "hiredVendors", "Admin", "message"],
  endpoints: (builder) => ({
    checkWishList: builder.query({
      query: (id) => `/wishlist/checkWishlist/${id}`,
      providesTags: ["wishlist", "Admin"],
    }),
    getWishlistData: builder.query({
      query: () => `/wishlist`,
      providesTags: ["wishlist", "Admin"],
    }),
    addWishList: builder.mutation({
      query: (body) => ({
        url: `/wishlist`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["wishlist", "Admin"],
    }),
    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist", "Admin"],
    }),
    // ======================Wishlist=============================\
    ...{
      checkHiredVendor: builder.query({
        query: (id) => `/hiredVendor/checkHiredVendor/${id}`,
        providesTags: ["hiredVendors"],
      }),
      getHiredVendorData: builder.query({
        query: () => `/hiredVendor`,
        providesTags: ["hiredVendors"],
      }),
      addHiredVendor: builder.mutation({
        query: (body) => ({
          url: `/hiredVendor`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["hiredVendors"],
      }),
      deleteHiredVendor: builder.mutation({
        query: (id) => ({
          url: `/hiredVendor/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["hiredVendors"],
      }),
    },
    // ======================Hired Vendor=============================
    ...{
      checkCart: builder.query({
        query: ({ _id, size }) => `/cart/checkCart/${_id}?size=${size}`,
        providesTags: ["cart"],
      }),
      getAllCarts: builder.query({
        query: () => `/cart`,
        providesTags: ["cart"],
      }),
      addCart: builder.mutation({
        query: (body) => ({
          url: `/cart`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["cart"],
      }),
      updateCart: builder.mutation({
        query: (body) => ({
          url: `/cart`,
          method: "PATCH",
          body: body,
        }),
        invalidatesTags: ["cart"],
      }),
      deletCart: builder.mutation({
        query: (id) => ({
          url: `/cart/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["cart"],
      }),
    },
    // ======================Cart=============================
    ...{
      getContacts: builder.query({
        query: (prospectId) =>
          `/contacts/get?${prospectId ? `&&prospectId=${prospectId}` : ""}`,
      }),
      getGroups: builder.query({
        query: ({ prospectId, vendorId }) =>
          `/contacts/getgroups?${
            prospectId ? `&&prospectId=${prospectId}` : ""
          }${vendorId ? `&&vendorId=${vendorId}` : ""}`,
      }),
      getAllMesssage: builder.query({
        query: (id) => `/contacts/getmessages?prospectId=${id}`,
      }),
      getAdminMessage: builder.query({
        query: () => `/contacts/getadminmsg`,
        providesTags: ["contact"],
      }),
      getOneMessage: builder.query({
        query: (id) => `/contacts/getone?id=${id}`,
      }),
      getOnGroup: builder.query({
        query: ({ id, page, type }) =>
          `/contacts/getonegroup?id=${id}&page=${page}&type=${type}`,
      }),
      getAllContacts: builder.query({
        query: ({ prospectId, vendorId }) =>
          `/contacts/getall?${prospectId ? `&&prospectId=${prospectId}` : ""}${
            vendorId ? `&&vendorId=${vendorId}` : ""
          }`,
      }),
      getOneContact: builder.query({
        query: ({ prospectId, vendorId }) =>
          `/contacts/getonecontact?${
            prospectId ? `&&prospectId=${prospectId}` : ""
          }${vendorId ? `&&vendorId=${vendorId}` : ""}`,
        providesTags: ["contact"],
      }),
      deleteMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/deletemsg`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      addContact: builder.mutation({
        query: (body) => ({
          url: `/contacts/add`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      addMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/addmessage`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      addAdminMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/addadminmsg`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      getOneMesbyTwoIds: builder.mutation({
        query: (body) => ({
          url: `/contacts/getonemsgbytwoid`,
          method: "POST",
          body: body,
        }),
        providesTags: ["contact"],
      }),
      addtoGroup: builder.mutation({
        query: (body) => ({
          url: `/contacts/addtogroup`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      renameGroup: builder.mutation({
        query: (body) => ({
          url: `/contacts/renamegroup`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      leaveGroup: builder.mutation({
        query: (body) => ({
          url: `/contacts/leavefromgroup`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      removeFromGroup: builder.mutation({
        query: (body) => ({
          url: `/contacts/removefromgroup`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      createGroup: builder.mutation({
        query: (body) => ({
          url: `/contacts/creategroup`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      addGroupMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/addgroupmessage`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      deleteGroupMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/deletegrpmsg`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
      uploadfileMessage: builder.mutation({
        query: (body) => ({
          url: `/contacts/uploadfile`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["contact"],
      }),
    },
    // ======================Contact=============================
  }),
});

export const {
  useCheckWishListQuery,
  useGetWishlistDataQuery,
  useDeleteWishListMutation,
  useAddWishListMutation,

  useCheckHiredVendorQuery,
  useGetHiredVendorDataQuery,
  useDeleteHiredVendorMutation,
  useAddHiredVendorMutation,

  useCheckCartQuery,
  useAddCartMutation,
  useUpdateCartMutation,
  useDeletCartMutation,
  useGetAllCartsQuery,

  useGetOneContactQuery,
  useAddContactMutation,
  useGetOneMesbyTwoIdsMutation,
  useAddtoGroupMutation,
  useGetContactsQuery,
  useRemoveFromGroupMutation,
  useLeaveGroupMutation,
  useRenameGroupMutation,
  useGetAllContactsQuery,
  useDeleteGroupMessageMutation,
  useUploadfileMessageMutation,
  useGetOnGroupQuery,
  useGetGroupsQuery,
  useAddGroupMessageMutation,
  useCreateGroupMutation,
  useGetAdminMessageQuery,
  useDeleteMessageMutation,
  useGetOneMessageQuery,
  useAddMessageMutation,
  useAddAdminMessageMutation,
  useGetAllMesssageQuery,
  useLazyGetOnGroupQuery,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = chwApi;
export const {
  getOneContact,
  checkHiredVendor,
  deleteWishList,
  deleteHiredVendor,
  addWishList,
  addHiredVendor,
  addContact,
  getOneMesbyTwoIds,
  checkCart,
  checkWishList,
  updateCart,
  addCart,
  getWishlistData,
  getHiredVendorData,
  deletCart,
  getAllCarts,
} = chwApi.endpoints;
