import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const signInAndLoginApi = createApi({
  reducerPath: "signInAndLoginApi",
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
  tagTypes: ["signlogin"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `/customers/login`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    studentLogin: builder.mutation({
      query: (body) => ({
        url: `/student/login`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    createOtp: builder.mutation({
      query: (body) => ({
        url: `/otp`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: `/otp/verify`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    verifyStudent: builder.mutation({
      query: (body) => ({
        url: `/student/verify`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    createUserAccount: builder.mutation({
      query: (body) => ({
        url: `/customers/create`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    createStudentAccount: builder.mutation({
      query: (body) => ({
        url: `/student/signup`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: `/customers/forgotpassword`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    updatePasswordWithOldPassword: builder.mutation({
      query: (body) => ({
        url: `/customers/updatewithpass`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    updatePasswordWithOldPasswordforStudent: builder.mutation({
      query: (body) => ({
        url: `/student/password`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    updateCustomerProfile: builder.mutation({
      query: (body) => ({
        url: `/customers/update`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    updateStudentProfile: builder.mutation({
      query: (body) => ({
        url: `/student/update`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
    verifyOtpinprofile: builder.mutation({
      query: (body) => ({
        url: `/users/sendotp`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["signlogin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateOtpMutation,
  useVerifyOtpMutation,
  useCreateUserAccountMutation,
  useForgetPasswordMutation,
  useUpdatePasswordWithOldPasswordMutation,
  useUpdateCustomerProfileMutation,
  useVerifyOtpinprofileMutation,
  useStudentLoginMutation,
  useCreateStudentAccountMutation,
  useUpdatePasswordWithOldPasswordforStudentMutation,
  useUpdateStudentProfileMutation,
  useVerifyStudentMutation,
  // util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = signInAndLoginApi;
export const {
  login,
  createOtp,
  verifyOtp,
  createUserAccount,
  forgetPassword,
  updatePasswordWithOldPassword,
  updateCustomerProfile,
  studentLogin,
  updatePasswordWithOldPasswordforStudent,
  createStudentAccount,
  updateStudentProfile,
  verifyStudent,
} = signInAndLoginApi.endpoints;
