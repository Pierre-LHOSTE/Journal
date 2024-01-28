import { ConfigProvider, theme as antdTheme } from "antd";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { openNotification } from "./reducers/NotificationSlice";
import {
  useGetArticlesMutation,
  useGetVersionsQuery,
} from "./reducers/articleApi";
import { setArticles } from "./reducers/articleSlice";
import { login, logout, setLogged } from "./reducers/authSlice";
import {
  getErrorMessage,
  isTokenExpired,
  refreshTokenApi,
} from "./reducers/functions";
import { setTheme } from "./reducers/settingsSlice";
import { routes } from "./routes";
import { useAppDispatch, useAppSelector } from "./store";
import { ArticleFullType } from "./types/article";
import { VersionsType } from "./types/version";

const router = createBrowserRouter(routes);

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const articles = useAppSelector<ArticleFullType[]>(
    (state) => state.article.articles
  );
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ]);

  const [
    getArticles,
    {
      isError: isErrorArticles,
      error: errorArticles,
      data: newArticles,
      isSuccess: isSuccessArticles,
    },
  ] = useGetArticlesMutation();

  const {
    data: versions,
    isError: isErrorVersions,
    error: errorVersions,
    isSuccess: successVersions,
  } = useGetVersionsQuery();

  useEffect(() => {
    if (!isErrorVersions) return;
    const errorMessage = getErrorMessage(errorVersions as object);
    dispatch(
      openNotification({
        title: "Error",
        type: "error",
        description: errorMessage,
        detailed: true,
      })
    );
  }, [isErrorVersions]);

  useEffect(() => {
    if (!isErrorArticles) return;
    const errorMessage = getErrorMessage(errorArticles as object);
    dispatch(
      openNotification({
        title: "Error",
        type: "error",
        description: errorMessage,
        detailed: true,
      })
    );
  }, [isErrorArticles]);

  useEffect(() => {
    if (!isSuccessArticles) return;
    dispatch(setArticles(newArticles));
  }, [isSuccessArticles]);

  function successLogout() {
    dispatch(openNotification({ title: "Déconnecté", type: "warning" }));
    dispatch(logout());
    removeCookie("token");
    removeCookie("refreshToken");
  }

  function successLogin({
    accessToken,
    refreshToken,
    isCookies = false,
  }: {
    accessToken?: string;
    refreshToken?: string;
    isCookies?: boolean;
  }) {
    dispatch(openNotification({ title: "Connecté", type: "success" }));
    dispatch(login({ accessToken, refreshToken }));
    if (!isCookies) {
      setCookie("token", accessToken, {
        secure: true,
        path: "/",
      });
      setCookie("refreshToken", refreshToken, {
        secure: true,
        path: "/",
      });
    }
  }

  async function checkToken() {
    const token = cookies.token;
    const refreshToken = cookies.refreshToken;
    console.log("Checking token...");
    if (!token || !refreshToken) {
      console.log("Token or refresh token not found. User is not logged in.");
      setLogged(false);
    } else {
      console.log("Token and refresh token found. Verifying tokens...");
      if (isTokenExpired(refreshToken)) {
        console.log("Refresh token expired. Logging out...");
        successLogout();
        return;
      }
      if (isTokenExpired(token)) {
        console.log("Access token expired. Refreshing token...");
        const newToken = await refreshTokenApi(refreshToken);
        if (newToken) {
          console.log("Token refreshed successfully. Logging in...");
          successLogin({
            accessToken: newToken,
            refreshToken: refreshToken,
          });
        } else {
          console.log("Failed to refresh token. Logging out...");
          successLogout();
          return;
        }
      } else {
        console.log("Tokens are valid. User is logged in.");
        successLogin({
          accessToken: token,
          refreshToken: refreshToken,
          isCookies: true,
        });
      }
    }
  }

  useEffect(() => {
    if (successVersions) {
      const newVersion = versions.reduce(
        (acc: VersionsType, version: VersionsType) => {
          return { refreshCount: version.refreshCount + acc.refreshCount };
        },
        { refreshCount: 0 }
      ).refreshCount;
      const actualVersion = articles.reduce(
        (acc: VersionsType, version: VersionsType) => {
          return { refreshCount: version.refreshCount + acc.refreshCount };
        },
        { refreshCount: 0 }
      ).refreshCount;
      if (newVersion !== actualVersion) {
        getArticles();
      }
    }
  }, [successVersions]);

  useEffect(() => {
    dispatch(setTheme(theme));
    checkToken();
  }, []);

  useEffect(() => {
    console.log("Articles changed");
    console.log(articles);
  }, [articles]);

  const selectedAntdTheme =
    theme === "dark"
      ? {
          algorithm: antdTheme.darkAlgorithm,
        }
      : {
          algorithm: antdTheme.defaultAlgorithm,
        };

  return (
    <>
      <ConfigProvider theme={selectedAntdTheme}>
        <RouterProvider router={router} />
      </ConfigProvider>
    </>
  );
}

export default App;
