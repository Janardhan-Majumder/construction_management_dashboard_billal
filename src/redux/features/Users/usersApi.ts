import { buildQueryParams } from "../../../lib/helpers/paramsQueryBuilder";
import type { TArgs } from "../../../types/common.type";
import { baseApi } from "../../api/baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // company
    getAllCompanies: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        return {
          url: "admin/companies",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["company"],
    }),
    getCompanyDetails: builder.query({
      query: ({ id, args }) => {
        const params = buildQueryParams(args);
        return {
          url: `admin/company/users/${id}`,
          method: "GET",
          params,
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["company"],
    }),
    // employees
    getAllEmployees: builder.query({
      query: (args: TArgs) => {
        const params = buildQueryParams(args);
        console.log("hello");
        return {
          url: "office-admin/employes",
          method: "GET",
          params,
        };
      },
      // transformResponse: (response) => response.data,
      providesTags: ["employee"],
    }),
    addEmployee: builder.mutation({
      query: (body) => ({
        url: `office-admin/add-worker`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetCompanyDetailsQuery,
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
} = usersApi;
