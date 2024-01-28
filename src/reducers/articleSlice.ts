import { createSelector, createSlice } from "@reduxjs/toolkit";
import { ArticleFullType } from "../types/article";

export const articleSlice = createSlice({
  name: "article",
  initialState: {
    articles: [] as ArticleFullType[],
  },
  reducers: {
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setArticle: (state, action) => {
      const article = action.payload;
      state.articles = state.articles.map((a: ArticleFullType) => {
        if (a._id === article._id) {
          return article;
        }
        return a;
      });
    },
  },
});

export const { setArticles, setArticle } = articleSlice.actions;

export default articleSlice.reducer;

export const selectArticleById = (articleId: string) =>
  createSelector([(state) => state.article.articles], (articles) =>
    articles.find((article: ArticleFullType) => article._id === articleId || "")
  );

export const selectArticleByUrl = (url: string) =>
  createSelector([(state) => state.article.articles], (articles) =>
    articles.find((article: ArticleFullType) => article.urls.includes(url))
  );
