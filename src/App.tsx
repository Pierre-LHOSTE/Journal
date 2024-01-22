import Header from "./components/header/Header";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useAppDispatch, useAppSelector } from "./store";
import LoginModal from "./components/modals/login/LoginModal";
import { useEffect } from "react";
import { setLogged, setTheme } from "./reducers/settingsSlice";
import Notification from "./components/notification/Notification";
import { useCheckTokenMutation } from "./reducers/authApi";
import { useCookies } from "react-cookie";
import DashboardPage from "./pages/admin/DashboardPage";
import EditArticlePage from "./pages/admin/EditArticlePage";
import { setToken } from "./reducers/authSlice";

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
  const [cookies, , removeCookies] = useCookies(["token"]);
  const [checkToken, { data: checkTokenResult, isError: checkError }] =
    useCheckTokenMutation();

  useEffect(() => {
    dispatch(setTheme(theme));
    checkToken(cookies.token);
  }, []);

  useEffect(() => {
    if (checkError) {
      removeCookies("token");
      dispatch(setLogged(false));
    }
  }, [checkError]);

  useEffect(() => {
    if (checkTokenResult) {
      dispatch(setLogged(true));
      dispatch(setToken(cookies.token));
    }
  }, [checkTokenResult]);

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
