import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";
import type { TArgs } from "../../../types/common.type";
import { baseApi } from "../../api/baseApi";

const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // company
    getActiveSites: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "office-admin/sites",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["task"],
    }),
    getAssinedSites: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "office-admin/assigned-sites",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["task"],
    }),
    getAssinedUserDetails: builder.query({
      query: ({ args, id }: { args: TArgs; id: string }) => {
        const params = buildQueryParams(args);
        return {
          url: `office-admin/assigned-tasks/${id.split("_")[0]}/${id.split("_")[1]}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["task"],
    }),
    // addEmployee: builder.mutation({
    //   query: (body) => ({
    //     url: `office-admin/add-worker`,
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["auth"],
    // }),
  }),
});

export const {
  useGetActiveSitesQuery,
  useGetAssinedSitesQuery,
  useGetAssinedUserDetailsQuery,
} = tasksApi;
