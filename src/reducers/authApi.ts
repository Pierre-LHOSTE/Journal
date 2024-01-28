import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "",
  }),
  tagTypes: ["login"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "https://westeurope.azure.services.cloud.mongodb.com/api/client/v2.0/app/application-0-owulp/auth/providers/local-userpass/login",
        method: "POST",
        body: {
          email: email,
          password: password,
        },
      }),
      invalidatesTags: ["login"],
    }),
    refreshToken: builder.mutation({
      query: (refresh_token) => ({
        url: "https://westeurope.azure.services.cloud.mongodb.com/api/client/v2.0/auth/session",
        method: "POST",
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
