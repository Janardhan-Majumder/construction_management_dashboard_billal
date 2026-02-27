import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";
import type { TArgs } from "../../../types/common.type";
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "users",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["user"],
    }),
    getUserDetails: builder.query({
      query: ({ id }) => {
        // const params = buildQueryParams(args);
        return {
          url: `/users/driver/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["user"],
    }),
    suspendUser: builder.mutation({
      query: ({ id, status, reason }) => ({
        url: `/users/status`,
        method: "PATCH",
        body: { userId: id, status: status, rejectionReason: reason },
      }),
      invalidatesTags: ["user"],
    }),
    // getPendingRequest: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: "user/verification-status",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["user"],
    // }),
    // upadateProfile: builder.mutation({
    //   query: (body) => ({
    //     url: `user/profile-update`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    // acceptVerification: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `user/confirm-profile-verification?userId=${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["user"],
    // }),
    // adminNotification: builder.query({
    //   query: (args) => {
    //     const params = new URLSearchParams();
    //     if (args) {
    //       args.forEach((item) => {
    //         params.append(item.name, item.value);
    //       });
    //     }
    //     return {
    //       url: "notification",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["transaction", "user"],
    // }),
    // adminNotificationBadge: builder.query({
    //   query: () => {
    //     return {
    //       url: "notification/badge-count",
    //       method: "GET",
    //     };
    //   },
    //   // providesTags: ["transaction", "user"],
    // }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserDetailsQuery,
  useSuspendUserMutation,
} = usersApi;
