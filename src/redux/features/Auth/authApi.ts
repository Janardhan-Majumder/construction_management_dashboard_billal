import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserByToken: builder.query({
      query: () => {
        return {
          url: `users/me`,
          method: "GET",
        };
      },
      transformResponse: (response) => response.data,
      providesTags: ["auth"],
    }),
    upadateProfile: builder.mutation({
      query: (body) => ({
        url: `users/profile`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["auth"],
    }),
    postLogin: builder.mutation({
      query: (data) => {
        return {
          url: `auth/login`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response) => response.data,
      //   invalidatesTags: ["auth"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `auth/forget-password`,
          method: "POST",
          body: data,
        };
      },
    }),
    verifyEmail: builder.mutation({
      query: (body) => {
        return {
          url: `auth/verify-otp`,
          method: "POST",
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (body) => {
        return {
          url: `auth/reset-password`,
          method: "POST",
          //   headers: { Authorization: `Bearer ${token}` },
          body,
        };
      },
      invalidatesTags: ["auth"],
    }),
    resendOTP: builder.mutation({
      query: (body) => {
        return {
          url: `auth/resend-otp/${body.email}`,
          method: "POST",
        };
      },
    }),

    changePassword: builder.mutation({
      query: (body) => {
        return {
          url: `auth/change-password`,
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const {
  usePostLoginMutation,
  useUpadateProfileMutation,
  useGetUserByTokenQuery,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResendOTPMutation,
  useChangePasswordMutation,
} = authApi;
