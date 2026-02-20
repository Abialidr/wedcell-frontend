import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const budgetPlannerApi = createApi({
  reducerPath: "budgetPlannerApi",
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
  tagTypes: ["budget"],
  endpoints: (builder) => ({
    getBudgetCats: builder.query({
      query: () => `/budget/categories`,
      providesTags: ["budget"],
    }),
    getBudgetSubCats: builder.query({
      query: (id) => `/budget/subcat/${id}`,
      providesTags: ["budget"],
    }),
    generatePdf: builder.mutation({
      query: (body) => ({
        url: `/customers/generatepdf`,
        method: "POST",
        body: body,
      }),
    }),
    addBudgetCats: builder.mutation({
      query: (body) => ({
        url: `/budget/categories/add`,
        method: "POST",
        body: body,
      }),
    }),
    addBudgetSubCats: builder.mutation({
      query: (body) => ({
        url: `/budget/subcat/add`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["budget"],
    }),
    addSubCatNotes: builder.mutation({
      query: (body) => ({
        url: `/budget/subcat/notes`,
        method: "PUT",
        body: body,
      }),
    }),
    updateCategoryName: builder.mutation({
      query: (body) => ({
        url: `/budget/categories/update`,
        method: "PUT",
        body: body,
      }),
    }),
    updateSubCats: builder.mutation({
      query: (body) => ({
        url: `/budget/subcat/update`,
        method: "PUT",
        body: body,
      }),
    }),
    updateTEA: builder.mutation({
      query: (body) => ({
        url: `/budget/updatetea`,
        method: "PUT",
        body: body,
      }),
    }),
    deleteBudgetCats: builder.mutation({
      query: (id) => ({
        url: `/budget/categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["budget"],
    }),
    deleteBudgetSubCats: builder.mutation({
      query: ({ id, catId }) => ({
        url: `/budget/subcat/delete/${catId}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["budget"],
    }),
  }),
});

export const {
  useGeneratePdfMutation,
  useGetBudgetCatsQuery,
  useGetBudgetSubCatsQuery,
  useAddBudgetCatsMutation,
  useAddSubCatNotesMutation,
  useUpdateCategoryNameMutation,
  useUpdateTEAMutation,
  useAddBudgetSubCatsMutation,
  useDeleteBudgetCatsMutation,
  useDeleteBudgetSubCatsMutation,
  useUpdateSubCatsMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = budgetPlannerApi;
export const {
  generatePdf,
  getBudgetCats,
  getBudgetSubCats,
  addBudgetCats,
  addSubCatNotes,
  updateCategoryName,
  updateTEA,
  addBudgetSubCats,
  deleteBudgetCats,
  deleteBudgetSubCats,
  updateSubCats,
} = budgetPlannerApi.endpoints;
