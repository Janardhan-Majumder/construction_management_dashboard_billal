import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";
import type { TArgs } from "../../../types/common.type";
import { baseApi } from "../../api/baseApi";

const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    companySubscription: builder.query({
      query: ({ id }) => {
        return {
          url: `admin/${id}/subscription`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["subscription"],
    }),
    subscriptionHistory: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: `admin/user-subscriptions`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["subscription"],
    }),
    //  suspendCompany: builder.mutation({
    //   query: ({ id, status, reason }) => ({
    //     url: `/users/status`,
    //     method: "PATCH",
    //     body: { userId: id, status: status, rejectionReason: reason },
    //   }),
    //   invalidatesTags: ["company"],
    // }),
    // getAllUser: builder.query({
    //   query: (args: TArgs) => {
    //     const params = buildQueryParams(args);
    //     return {
    //       url: "users",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   // transformResponse: (response) => response.data,
    //   providesTags: ["user"],
    // }),
    // getUserDetails: builder.query({
    //   query: ({ id }) => {
    //     // const params = buildQueryParams(args);
    //     return {
    //       url: `/users/driver/${id}`,
    //       method: "GET",
    //     };
    //   },
    //   transformResponse: (response) => response.data,
    //   providesTags: ["user"],
    // }),
  }),
});

export const { useCompanySubscriptionQuery, useSubscriptionHistoryQuery } =
  subscriptionApi;
