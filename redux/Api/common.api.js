import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROXY, S3PROXY } from "config";
import { HYDRATE } from "next-redux-wrapper";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${PROXY}`,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("wedfield"))?.data?.token
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
  tagTypes: ["Admin", "wishlist"],
  endpoints: (builder) => ({
    adminFrontPageLoad: builder.query({
      query: () => "/adminessentials",
      providesTags: ["Admin"],
    }),
    getAllProduct: builder.query({
      query: ({
        _id,
        category,
        subCategory,
        city,
        productPrice,
        color,
        occation,
        isUser,
        size,
        popular,
        page,
      }) => ({
        url: `/product/getAll`,
        params: {
          ...(_id ? { _id } : {}),
          ...(category ? { category } : {}),
          ...(subCategory ? { subCategory } : {}),
          ...(city ? { city } : {}),
          ...(productPrice ? { productPrice } : {}),
          ...(color ? { color } : {}),
          ...(occation ? { occation } : {}),
          ...(isUser ? { isUser } : {}),
          ...(size ? { size } : {}),
          ...(popular ? { popular } : {}),
          ...(page ? { page } : {}),
        },
      }),
      providesTags: ["Admin", "wishlist"],
    }),
    getAllOtherProduct: builder.query({
      query: ({ _id, category, isUser, page, productPrice, popular }) => ({
        url: `/product/get-all-other-products`,
        params: {
          ...(popular ? { popular } : {}),
          ...(category ? { category } : {}),
          ...(isUser ? { isUser } : {}),
          ...(page ? { page } : {}),
          ...(productPrice ? { productPrice } : {}),
          ...(_id ? { _id } : {}),
        },
      }),
      providesTags: ["Admin", "wishlist"],
    }),
    getOneProduct: builder.query({
      query: (_id) => `/product/getoneproduct?${_id ? `&&_id=${_id}` : ""}`,
      providesTags: ["Admin", "wishlist"],
    }),
    getOneOtherProduct: builder.query({
      query: (_id) =>
        `/product/get-one-other-products?${_id ? `&&_id=${_id}` : ""}`,
      providesTags: ["Admin", "wishlist"],
    }),
    getAllStudents: builder.query({
      query: () => `/student/getall`,
      providesTags: ["Admin"],
    }),
    getAllStudentsByCity: builder.query({
      query: (city) => `/student/getallbycity/${city}`,
      providesTags: ["Admin"],
    }),
    getAllVendor: builder.query({
      query: ({
        _id,
        category,
        city,
        subCategory,
        subSubCategory,
        popular,
        page,
        price,
        isAdmin,
        isUser,
      }) =>
        `/vendoruser/getAll?${
          category ? `&&category=${category.replace("&", "%26")}` : ""
        }${
          subCategory ? `&&subCategory=${subCategory.replace("&", "%26")}` : ""
        }${city ? `&&city=${city}` : ""}${_id ? `&&_id=${_id}` : ""}${
          isAdmin ? `&&isAdmin=${isAdmin}` : ""
        }${popular ? `&&popular=${popular}` : ""}${
          isUser ? `&&isUser=${isUser}` : ""
        }${page ? `&&page=${page}` : ""}${price ? `&&price=${price}` : ""}${
          subSubCategory && JSON.parse(subSubCategory).length
            ? `&&subSubCategory=${subSubCategory}`
            : ""
        }`,
      providesTags: ["Admin", "wishlist"],
    }),
    getAllDecore: builder.query({
      query: ({
        _id,
        category,
        city,
        subCategory,
        popular,
        page,
        price,
        isAdmin,
        isUser,
      }) =>
        `/decor/getAll?${
          category ? `&&category=${category.replace("&", "%26")}` : ""
        }${
          subCategory ? `&&subCategory=${subCategory.replace("&", "%26")}` : ""
        }${_id ? `&&_id=${_id}` : ""}${isAdmin ? `&&isAdmin=${isAdmin}` : ""}${
          popular ? `&&popular=${popular}` : ""
        }${isUser ? `&&isUser=${isUser}` : ""}${page ? `&&page=${page}` : ""}${
          price ? `&&price=${price}` : ""
        }`,
      providesTags: ["Admin", "wishlist"],
    }),
    getAllRemaningDecore: builder.query({
      query: ({ _id }) => `/decor/getAll/${_id}`,
      providesTags: ["Admin", "wishlist"],
    }),
    getAllVendorPost: builder.mutation({
      query: (body) => ({
        url: `/vendoruser/getAll`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["hiredVendors"],
    }),
    getAllVenue: builder.query({
      query: ({
        _id,
        category,
        city,
        subCategory,
        popular,
        price,
        isAdmin,
        page,
        isUser,
        rentalCostMin,
        rentalCostMax,
        pppMin,
        pppMax,
        lawnsMin,
        lawnsMax,
        banquetMin,
        banquetMax,
        roomsMin,
        roomsmax,
        ratingMax,
        ratingMin,
      }) => ({
        url: `/venueuser/getAll`,
        params: {
          _id,
          category,
          city,
          subCategory,
          popular,
          price,
          isAdmin,
          page,
          isUser,
          rentalCostMin,
          rentalCostMax,
          pppMin,
          pppMax,
          lawnsMin,
          lawnsMax,
          banquetMin,
          banquetMax,
          roomsMin,
          roomsmax,
          ratingMax,
          ratingMin,
        },
      }),

      providesTags: ["Admin", "wishlist"],
    }),
    getTextSeacrhAllVenue: builder.query({
      query: ({
        searchText,
        _id,
        category,
        city,
        subCategory,
        popular,
        price,
        isAdmin,
        page,
        isUser,
        rentalCostMin,
        rentalCostMax,
        pppMin,
        pppMax,
        lawnsMin,
        lawnsMax,
        banquetMin,
        banquetMax,
        roomsMin,
        roomsmax,
        ratingMax,
        ratingMin,
      }) => ({
        url: `/venueuser/fullTextSearch/${searchText}`,
        params: {
          _id,
          category,
          city,
          subCategory,
          popular,
          price,
          isAdmin,
          page,
          isUser,
          rentalCostMin,
          rentalCostMax,
          pppMin,
          pppMax,
          lawnsMin,
          lawnsMax,
          banquetMin,
          banquetMax,
          roomsMin,
          roomsmax,
          ratingMax,
          ratingMin,
        },
      }),
      providesTags: ["Admin"],
    }),
    getVendorEvent: builder.query({
      query: (loca) => `/event/getallwithvendors/${loca}`,
      providesTags: ["Admin"],
    }),
    getOneVendorEvent: builder.query({
      query: (id) => `/event/getonewithvendors/${id}`,
      providesTags: ["Admin"],
    }),
    fulltextSearchproduct: builder.query({
      query: ({
        searchText,
        page,
        subCatagory: subCategory,
        price: productPrice,
        color,
        size,
        occation,
        isUser,
      }) => ({
        url: `/product/fullTextSearch/${searchText}`,
        params: {
          ...(page ? { page } : {}),
          ...(subCategory ? { subCategory } : {}),
          ...(productPrice ? { productPrice } : {}),
          ...(color ? { color } : {}),
          ...(size ? { size } : {}),
          ...(occation ? { occation } : {}),
          ...(isUser ? { isUser } : {}),
        },
      }),

      providesTags: ["Admin"],
    }),
    fulltextSearchOtherproduct: builder.query({
      query: ({ searchText, page, catagory, price }) =>
        `/product/fullTextSearch-other-products/${searchText}?page=${page}&&category=${catagory}productPrice=${price}`,
      providesTags: ["Admin"],
    }),
    fulltextSearchVendor: builder.query({
      query: ({ searchText, page, catagory, subCategory, price, city }) =>
        `/vendoruser/fullTextSearch/${searchText}?page=${page}&category=${catagory}${
          city
            ? `&&.0
          3.02326512521
          .3
          
          =${city}`
            : ""
        }&subCategory=${subCategory}&price=${price}`,
      providesTags: ["Admin"],
    }),
    fulltextSearchVenue: builder.query({
      query: ({ searchText, page, category, price, city }) =>
        `/venueuser/fullTextSearch/${searchText}?page=${page}&type=Venue&category=${category}${
          city ? `&&city=${city}` : ""
        }&price=${price}`,
      providesTags: ["Admin"],
    }),
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
    getOneSNUById: builder.query({
      query: (id) => `/shopnowuser/getuserbyid/${id}`,
    }),
    deleteWishList: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["wishlist", "Admin"],
    }),
    // userLogin: builder.mutation({
    //   query: (User) => ({
    //     url: '/login',
    //     method: 'POST',
    //     body: User,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    // userChangePhone: builder.mutation({
    //   query: (data) => ({
    //     url: '/user/change-phone',
    //     method: 'PATCH',
    //     body: data,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    // userDelete: builder.mutation({
    //   query: ({ id, data }) => ({
    //     url: '/enterprise/delete-user/${id}',
    //     method: 'DELETE',
    //     body: data,
    //   }),
    //   invalidatesTags: ['User'],
    // }),
    // ====================================
  }),
});

export const {
  useGetOneOtherProductQuery,
  useAdminFrontPageLoadQuery,
  useGetAllProductQuery,
  useGetAllVendorQuery,
  useLazyGetAllVendorQuery,
  useGetAllVenueQuery,
  useLazyGetAllVenueQuery,
  useGetTextSeacrhAllVenueQuery,
  useLazyGetTextSeacrhAllVenueQuery,
  useGetOneProductQuery,
  useGetAllStudentsQuery,
  useGetAllStudentsByCityQuery,
  useGetAllVendorPostMutation,
  useGetVendorEventQuery,
  useGetOneVendorEventQuery,
  useFulltextSearchproductQuery,
  useFulltextSearchVendorQuery,
  useLazyFulltextSearchVendorQuery,
  useFulltextSearchVenueQuery,
  useAddWishListMutation,
  useCheckWishListQuery,
  useDeleteWishListMutation,
  useGetWishlistDataQuery,
  useGetOneSNUByIdQuery,
  useFulltextSearchOtherproductQuery,
  useGetAllOtherProductQuery,
  useLazyGetAllOtherProductQuery,
  useGetAllDecoreQuery,
  useGetAllRemaningDecoreQuery,
  useLazyGetAllRemaningDecoreQuery,
  util: { getRunningQueriesThunk: getRunningQueriesThunkFromAdmin },
} = adminApi;

export const {
  adminFrontPageLoad,
  getAllProduct,
  getAllVendor,
  getAllVenue,
  getTextSeacrhAllVenue,
  getOneProduct,
  getAllStudents,
  getAllStudentsByCity,
} = adminApi.endpoints;
