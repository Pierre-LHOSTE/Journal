import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { openLogin, toggleTheme } from "../../reducers/settingsSlice";
import IconMoon from "./icons/MoonIcon";
import IconSun from "./icons/SunIcon";
import LogoIcon from "./icons/logoIcon";
import SearchIcon from "./icons/SearchIcon";
import { useCookies } from "react-cookie";
import { deleteTokens, setLogged } from "../../reducers/authSlice";

const iconSize = 24;
const iconStroke = 1.5;

function Header() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settings.theme);
  const isLogged = useAppSelector((state) => state.auth.isLogged);
  const [, , removeCookies] = useCookies(["token"]);

  function switchTheme() {
    dispatch(toggleTheme());
  }

  function login() {
    dispatch(openLogin());
  }

  function logout() {
    removeCookies("token");
    dispatch(deleteTokens());
    dispatch(setLogged(false));
  }

  return (
    <header>
      <div>
        <div id="header-title">{<LogoIcon />}</div>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/articles">Articles</NavLink>
            </li>
            <li>
              <NavLink to="/about">À propos</NavLink>
            </li>
            {isLogged ? (
              <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>

      <div id="header-action">
        {isLogged ? (
          <Button type="text" danger size="large" onClick={logout}>
            Se déconnecter
          </Button>
        ) : (
          <Button type="text" size="large" onClick={login}>
            Connexion
          </Button>
        )}
        <Button
          type="text"
          size="large"
          icon={<SearchIcon size={iconSize} stroke={iconStroke} />}
        />
        <Button
          type="text"
          size="large"
          icon={
            theme === "dark" ? (
              <IconMoon size={iconSize} />
            ) : (
              <IconSun size={iconSize} />
            )
          }
          onClick={switchTheme}
        />
      </div>
    </header>
  );
}

export default Header;
