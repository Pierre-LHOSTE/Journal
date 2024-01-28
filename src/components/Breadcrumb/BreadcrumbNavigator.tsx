import { HomeFilled } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../routes";
import { useAppSelector } from "../../store";
import { ArticleFullType } from "../../types/article";

interface Route {
  path?: string;
  title?: string;
  children?: Route[];
}

function findRoute(routes: Route[], name: string): string | undefined {
  for (const route of routes) {
    if (route.path === name) {
      return route.title;
    }

    if (route.children) {
      const found = findRoute(route.children, name);
      if (found) {
        return found;
      }
    }
  }
}

function findArticleName(articles: ArticleFullType[], name: string) {
  for (const article of articles) {
    if (article.urls.includes(name)) {
      return article.name;
    }
  }
}

function BreadcrumbNavigator() {
  const location = useLocation();
  const articles = useAppSelector((state) => state.article.articles);

  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const homeItem = [
    {
      title: (
        <>
          <Link to="/">
            <HomeFilled />
          </Link>
        </>
      ),
    },
  ];

  if (pathSnippets.length <= 0)
    homeItem.push({
      title: (
        <>
          <Link to="/">Accueil</Link>
        </>
      ),
    });

  const breadcrumbItems = [
    ...homeItem,
    ...pathSnippets.map((name, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const title =
        findRoute(routes, name) || findArticleName(articles, name) || name;

      return {
        title: <Link to={url}>{title}</Link>,
      };
    }),
  ];

  return <Breadcrumb items={breadcrumbItems} />;
}

export default BreadcrumbNavigator;
