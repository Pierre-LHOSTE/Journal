import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import LoginModal from "./components/modals/login/LoginModal";
import Notification from "./components/notification/Notification";

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <div id="windows">
        <LoginModal />
        <Notification />
      </div>
      <footer></footer>
    </>
  );
}

export default Layout;
