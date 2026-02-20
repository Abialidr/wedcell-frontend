import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PROXY}/rr`,
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
  tagTypes: ["review"],
  endpoints: (builder) => ({
    getallReviews: builder.query({
      query: ({ productid, userid, page }) =>
        `/reviews/all?${productid ? `&&productid=${productid}` : ""}${
          userid ? `&&userid=${userid}` : ""
        }${page ? `&&page=${page}` : ""}`,
      providesTags: ["review"],
    }),
    getAllQuality: builder.query({
      query: ({ id, category }) =>
        `/reviews/getCat?${id ? `&&id=${id}` : ""}${
          category.length ? `&&category=${JSON.stringify(category)}` : ""
        }`,
      providesTags: ["review"],
    }),
    getOneReview: builder.query({
      query: ({ userid, productid }) =>
        `/reviews/one?${userid ? `&&userid=${userid}` : ""}${
          productid ? `&&productid=${productid}` : ""
        }`,
      providesTags: ["review"],
    }),
    getAllReplies: builder.mutation({
      query: (body) => ({
        url: `/replies/all`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReplies: builder.mutation({
      query: (id) => ({
        url: `/replies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    createReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useGetallReviewsQuery,
  useGetAllQualityQuery,
  useGetOneReviewQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllRepliesMutation,
  useDeleteRepliesMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = reviewsApi;
export const {
  getallReviews,
  getAllQuality,
  getOneReview,
  createReview,
  updateReview,
  deleteReview,
  getAllReplies,
  deleteReplies,
} = reviewsApi.endpoints;
