import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { ArticleType } from "../types/article";
import { isTokenExpired, refreshTokenApi } from "./functions";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://westeurope.azure.data.mongodb-api.com/app/application-0-owulp/endpoint/",
    prepareHeaders: async (headers, { getState }) => {
      let token = (getState() as RootState).auth.accessToken;

      if (token && isTokenExpired(token)) {
        const refreshToken = (getState() as RootState).auth.refreshToken;
        token = await refreshTokenApi(refreshToken);
      }

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["articles"],
  endpoints: (builder) => ({
    createArticle: builder.mutation({
      query: (article: ArticleType) => ({
        url: "article",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["articles"],
    }),
  }),
});

export const { useCreateArticleMutation } = adminApi;
