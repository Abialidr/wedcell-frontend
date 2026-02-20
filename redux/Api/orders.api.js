import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["order"],
  endpoints: (builder) => ({
    singleVariant: builder.mutation({
      query: (body) => ({
        url: `/product/getvariant`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    cancelOrder: builder.mutation({
      query: (body) => ({
        url: `/api/v1/cancel`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    orderPayments: builder.mutation({
      query: (body) => ({
        url: `/api/v1/checkout`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    codCheckOut: builder.mutation({
      query: (body) => ({
        url: `/api/v1/checkout_cod`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    getOrders: builder.query({
      query: () => "/order/user/get",
      providesTags: ["order"],
    }),
    checkCharges: builder.query({
      query: ({ pincode, weight }) =>
        `/delivery/check_charges?pincode=${pincode}&&weight=${weight}`,
      providesTags: ["order"],
    }),
    checkPin: builder.query({
      query: ({ pincode }) => `/delivery/check?pincode=${pincode}`,
      providesTags: ["order"],
    }),
    userOrderGet: builder.query({
      query: () => `/order/user/get`,
      providesTags: ["order"],
    }),
    orderSingle: builder.mutation({
      query: (body) => ({
        url: `/order/single`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    updateCustomer: builder.mutation({
      query: (body) => ({
        url: `/customers/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
    orderInvoice: builder.mutation({
      query: (body) => ({
        url: `/order/create_invoice`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCancelOrderMutation,
  useGetOrdersQuery,
  useUpdateCustomerMutation,
  useSingleVariantMutation,
  useOrderPaymentsMutation,
  useCodCheckOutMutation,
  useCheckChargesQuery,
  useCheckPinQuery,
  useOrderSingleMutation,
  useUserOrderGetQuery,
  useOrderInvoiceMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = orderApi;
export const { cancelOrder, getOrders } = orderApi.endpoints;
