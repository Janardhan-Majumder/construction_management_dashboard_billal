import { baseApi } from "../../api/baseApi";
import type { TArgs } from "../../../types/common.type";
import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";

const transactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getEarnigsChart: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "admin/earnings-chart",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["transaction"],
    }),
    getTransaction: builder.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return {
          url: "transactions",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["transaction"],
    }),
    getWithdrawRequests: builder.query({
      query: (args) => {
        const params = buildQueryParams(args);
        return {
          url: "withdrawal-requests",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["transaction"],
    }),
    withdrawRequestConfirmation: builder.mutation({
      query: (body) => ({
        url: `/transactions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["transaction"],
    }),
    withdrawRequestRejection: builder.mutation({
      query: (body) => ({
        url: `/withdrawal-requests/reject`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["transaction"],
    }),
    // getWithdrawRequest: builder.query({
    //   query: (args) => {
    //     const params = buildQueryParams(args);
    //     return {
    //       url: "withdraws",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["transaction"],
    // }),
    // collaboratorCommissions: builder.query({
    //   query: (args) => {
    //     const params = buildQueryParams(args);
    //     return {
    //       url: "earning/collaborator-earning",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["transaction"],
    // }),

    // collaboratorWallet: builder.query({
    //   query: (args) => {
    //     const params = buildQueryParams(args);
    //     return {
    //       url: "earning/transaction-history",
    //       method: "GET",
    //       params,
    //     };
    //   },
    //   providesTags: ["transaction"],
    // }),

    // withdrawRequest: builder.mutation({
    //   query: (body) => ({
    //     url: `withdraws`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["transaction"],
    // }),

    // payment: builder.mutation({
    //   query: (body) => ({
    //     url: `withdraws/payment`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["transaction"],
    // }),
  }),
});

export const {
  useGetEarnigsChartQuery,
  useGetTransactionQuery,
  useGetWithdrawRequestsQuery,
  useWithdrawRequestConfirmationMutation,
  useWithdrawRequestRejectionMutation,
} = transactionApi;
