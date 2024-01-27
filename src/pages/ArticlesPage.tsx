import ArticleCard from "../components/article/ArticleCard";
import { useAppSelector } from "../store";
import { ArticleFullType } from "../types/article";

function ArticlesPage() {
  const articles = useAppSelector<ArticleFullType[]>(
    (state) => state.article.articles
  );
  const theme = useAppSelector((state) => state.settings.theme);

  return (
    <div id="articles-page">
      <div id="articles-list">
        {articles?.length
          ? articles.map((article, index) => (
              <ArticleCard theme={theme} key={index} article={article} />
            ))
          : null}
      </div>
    </div>
  );
}

export default ArticlesPage;
