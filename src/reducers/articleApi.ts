import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { VersionsType } from "../types/version";
import { ArticleFullType } from "../types/article";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://westeurope.azure.data.mongodb-api.com/app/application-0-owulp/endpoint/articles/",
  }),
  tagTypes: ["articles"],
  endpoints: (builder) => ({
    getArticles: builder.mutation<ArticleFullType[], void>({
      query: () => ({
        url: "list",
        method: "GET",
      }),
    }),
    getVersions: builder.query<VersionsType[], void>({
      query: () => ({
        url: "versions",
        method: "GET",
      }),
      providesTags: ["articles"],
    }),
  }),
});

export const { useGetArticlesMutation, useGetVersionsQuery } = articleApi;
