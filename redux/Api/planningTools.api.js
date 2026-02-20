import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const planningToolsApi = createApi({
  reducerPath: "planningToolsApi",
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
  tagTypes: ["planningTools"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => `/todos`,
      providesTags: ["planningTools"],
    }),
    getInviteSent: builder.query({
      query: () => `/guests/invitesent`,
      providesTags: ["planningTools"],
    }),
    getAT: builder.query({
      query: () => `/guests/at`,
      providesTags: ["planningTools"],
    }),
    getAPD: builder.query({
      query: () => `/guests/apd`,
      providesTags: ["planningTools"],
    }),
    getTotalVendor: builder.query({
      query: () => `/hiredVendor/totalVendor`,
      providesTags: ["planningTools"],
    }),
    getTodosByCondition2: builder.query({
      query: ({ completed, category }) =>
        `/todos/getBycondition?${
          completed !== undefined ? `&&completed=${completed}` : ""
        }${category ? `&&category=${category}` : ""}`,
      providesTags: ["planningTools"],
    }),
    getOneContact: builder.query({
      query: ({ prospectId, vendorId }) =>
        `/contacts/getonecontact?${
          prospectId ? `&&prospectId=${prospectId}` : ""
        }${vendorId ? `&&vendorId=${vendorId}` : ""}`,
      providesTags: ["planningTools"],
    }),
    updateWeddingPersonal: builder.mutation({
      query: (body) => ({
        url: `/customers/weddingpersonal`,
        method: "PUT",
        body: body,
      }),
    }),
    updateCoverPic: builder.mutation({
      query: (body) => ({
        url: `/customers/updatecoverpic`,
        method: "PUT",
        body: body,
      }),
    }),
    todosCheck: builder.mutation({
      query: (body) => ({
        url: `/todos/checked`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["planningTools"],
    }),
    addTodos: builder.mutation({
      query: (body) => ({
        url: `/todos`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["planningTools"],
    }),
    updateTodos: builder.mutation({
      query: (body) => ({
        url: `/todos/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["planningTools"],
    }),
    deleteTodos: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["planningTools"],
    }),
    getRtodos: builder.query({
      query: ({ todos }) =>
        `/todos/rtodos?${
          todos.length ? `&&todos=${JSON.stringify(todos)}` : ""
        }`,
      providesTags: ["planningTools"],
    }),
    updateTGM: builder.mutation({
      query: (body) => ({
        url: `/customers/updatetgm`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["planningTools"],
    }),
    deleteTGM: builder.mutation({
      query: (body) => ({
        url: `/customers/deletetgm`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["planningTools"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useUpdateWeddingPersonalMutation,
  useUpdateCoverPicMutation,
  useTodosCheckMutation,
  useGetTodosByCondition2Query,
  useGetInviteSentQuery,
  useGetATQuery,
  useGetAPDQuery,
  useGetTotalVendorQuery,
  useGetRtodosQuery,
  useDeleteTodosMutation,
  useAddTodosMutation,
  useUpdateTodosMutation,
  useUpdateTGMMutation,
  useDeleteTGMMutation,

  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = planningToolsApi;
export const {
  getTodos,
  updateWeddingPersonal,
  updateCoverPic,
  getInviteSent,
  getAT,
  getAPD,
  getTotalVendor,
  todosCheck,
  getTodosByCondition2,
  deleteTodos,
  getRtodos,
  addTodos,
  updateTodos,
  updateTGM,
  deleteTGM,
} = planningToolsApi.endpoints;
