import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";
import type { TArgs } from "../../../types/common.type";
import { baseApi } from "../../api/baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSetting: builder.query({
      query: (endpoint) => {
        return {
          url: endpoint,
          method: "GET",
        };
      },
      providesTags: ["setting"],
    }),
    updateSettings: builder.mutation({
      query: ({ url, body }) => ({
        url: url,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["setting"],
    }),
    // support
    getSupportRequests: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: `supports`,
          method: "GET",
          params,
        };
      },
      providesTags: ["support"],
    }),
    closeReport: builder.mutation({
      query: ({ id, body }) => ({
        url: `supports/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["support"],
    }),
  }),
});

export const {
  useGetSettingQuery,
  useUpdateSettingsMutation,
  useGetSupportRequestsQuery,
  useCloseReportMutation,
} = settingApi;
