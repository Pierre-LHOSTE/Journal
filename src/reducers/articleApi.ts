import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://westeurope.azure.data.mongodb-api.com/app/application-0-owulp/endpoint/",
  }),
  tagTypes: ["articles"],
  endpoints: (builder) => ({
    getArticles: builder.mutation({
      query: () => ({
        url: "articles",
        method: "GET",
      }),
      invalidatesTags: ["articles"],
    }),
  }),
});

export const { useGetArticlesMutation } = articleApi;
