import { List } from "antd";
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
        <List itemLayout="vertical" size="large">
          {articles?.length
            ? [...articles, ...articles, ...articles].map((article, index) => (
                <ArticleCard theme={theme} key={index} article={article} />
              ))
            : null}
        </List>
      </div>
    </div>
  );
}

export default ArticlesPage;
