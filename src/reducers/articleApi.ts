import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ArticleFullType } from "../types/article";
import { VersionsType } from "../types/version";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://westeurope.azure.data.mongodb-api.com/app/application-0-owulp/endpoint/",
  }),
  tagTypes: ["articles"],
  endpoints: (builder) => ({
    getArticles: builder.mutation<ArticleFullType[], void>({
      query: () => ({
        url: "articles/list",
        method: "GET",
      }),
    }),
    getVersions: builder.query<ArticleFullType[], void>({
      query: () => ({
        url: "articles/versions",
        method: "GET",
      }),
    }),
    getVersionByUrl: builder.query<VersionsType, string>({
      query: (url) => ({
        url: `article/version?url=${url}`,
        method: "GET",
      }),
      providesTags: ["articles"],
    }),
    getArticleById: builder.mutation<ArticleFullType, string>({
      query: (url) => ({
        url: `article/data?id=${url}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetArticlesMutation,
  useGetArticleByIdMutation,
  useGetVersionByUrlQuery,
  useGetVersionsQuery,
} = articleApi;
