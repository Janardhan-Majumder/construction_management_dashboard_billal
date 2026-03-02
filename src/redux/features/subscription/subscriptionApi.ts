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
      providesTags: ["company"],
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

export const { useCompanySubscriptionQuery } = subscriptionApi;
