import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { articleType } from "../types/article";
import { RootState } from "../store";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://westeurope.azure.data.mongodb-api.com/app/application-0-owulp/endpoint/",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      console.log(token);
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
      query: (article: articleType) => ({
        url: "article",
        method: "POST",
        body: article,
      }),
      invalidatesTags: ["articles"],
    }),
  }),
});

export const { useCreateArticleMutation } = adminApi;
