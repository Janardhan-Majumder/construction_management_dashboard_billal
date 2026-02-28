import { baseApi } from "../../api/baseApi";
import type { TArgs } from "../../../types/common.type";
import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";

const othersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminStatus: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "admin/dashboard-stats?year=2026",
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["transaction", "user"],
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
  useAdminStatusQuery,
  // useGetWithdrawRequestQuery,
  // useCollaboratorCommissionsQuery,
  // useCollaboratorWalletQuery,
  // useWithdrawRequestMutation,
  // usePaymentMutation,
} = othersApi;
