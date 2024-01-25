import Header from "./components/header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useAppDispatch, useAppSelector } from "./store";
import LoginModal from "./components/modals/login/LoginModal";
import { useEffect } from "react";
import { setTheme } from "./reducers/settingsSlice";
import Notification from "./components/notification/Notification";
import { useCookies } from "react-cookie";
import DashboardPage from "./pages/admin/DashboardPage";
import EditArticlePage from "./pages/admin/EditArticlePage";
import { login, logout, setLogged } from "./reducers/authSlice";
import { isTokenExpired, refreshTokenApi } from "./reducers/functions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "articles",
        element: <ArticlesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "dashboard/new",
        element: <EditArticlePage />,
      },
    ],
  },
]);

function App() {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([
    "token",
    "refreshToken",
  ]);

  function successLogout() {
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

    if (!token || !refreshToken) {
      setLogged(false);
    } else {
      if (isTokenExpired(refreshToken)) {
        successLogout();
        return;
      }
      if (isTokenExpired(token)) {
        const newToken = await refreshTokenApi(refreshToken);
        if (!newToken) {
          successLogout();
          return;
        } else {
          successLogin({ accessToken: newToken, refreshToken: refreshToken });
        }
      } else {
        successLogin({
          accessToken: token,
          refreshToken: refreshToken,
          isCookies: true,
        });
      }
    }
  }

  useEffect(() => {
    dispatch(setTheme(theme));
    checkToken();
  }, []);

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

function Layout() {
  return (
    <>
      <Header />
      <main>
        <LoginModal />
        <Notification />
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
