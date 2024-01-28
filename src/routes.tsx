import Layout from "./Layout";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesPage from "./pages/ArticlesPage";
import HomePage from "./pages/HomePage";
import DashboardArticles from "./pages/admin/DashboardArticles";
import DashboardAuthors from "./pages/admin/DashboardAuthors";
import DashboardPage from "./pages/admin/DashboardPage";
import EditArticlePage from "./pages/admin/EditArticlePage";

export const routes = [
  {
    path: "/",
    element: <Layout />,
    title: "Accueil",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "articles",
        title: "Articles",
        children: [
          {
            index: true,
            element: <ArticlesPage />,
          },
          {
            path: ":articleUrl",
            element: <ArticlePage />,
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
        title: "À propos",
      },
      {
        path: "dashboard",
        title: "Tableau de bord",
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "articles",
            title: "Articles",
            children: [
              {
                index: true,
                element: <DashboardArticles />,
              },
              {
                path: "new",
                element: <EditArticlePage />,
                title: "Nouveau",
              },
            ],
          },
          {
            path: "authors",
            title: "Auteurs",
            children: [
              {
                index: true,
                element: <DashboardAuthors />,
              },
            ],
          },
        ],
      },
    ],
  },
];
