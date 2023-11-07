import React, { FC, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IMenu } from "src/interfaces/interfaces";
import { useOnClickOutside } from "src/hooks/useOutsideClick";
import HomeIcon from "src/icons/home.svg";
import TrendsIcon from "src/icons/trends.svg";
import FavIcon from "src/icons/fav.svg";
import Light from "src/icons/light-theme.svg";
import Dark from "src/icons/dark-theme.svg";
import LightActive from "src/icons/light-theme-active.svg";
import DarkActive from "src/icons/dark-theme-active.svg";
import Exit from "src/icons/exit.svg";
import "./style.scss";
import { Link, useNavigate } from "react-router-dom";

const Menu: FC<IMenu> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(({ ui }) => ui.theme);
  const menuRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("access");
  useOnClickOutside(menuRef, () => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 250);
    }
  });
  const logOut = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    dispatch({ type: "REMOVE_USER" });
    navigate("/signin");
  };
  return (
    <div
      className={`menu ${isOpen ? "" : "hidden"} ${
        theme === "light" ? "light" : ""
      }`}
      ref={menuRef}
    >
      <nav className="navbar">
        <div className="nav-top">
          <div className="nav-item">
            <img src={HomeIcon} alt="home" /> <Link to="/main/1"> домой</Link>
          </div>
          <div className="nav-item">
            <img src={TrendsIcon} alt="trends" />
            <Link to="/latest"> новинки </Link>
          </div>
          <div className="nav-item">
            <img src={FavIcon} alt="fav" />
            {token ? (
              <Link to="/favorites"> коллекция </Link>
            ) : (
              <Link to="/signin"> коллекция </Link>
            )}
          </div>
          {token ? (
            <div className="nav-item">
              <img src={Exit} alt="exit" className="exit" />
              <p onClick={() => logOut()}>выйти</p>
            </div>
          ) : null}
        </div>
        <div className="nav-bottom">
          <div className="toggle-theme">
            <div>
              <img
                src={theme === "dark" ? DarkActive : Dark}
                alt="dark"
                className="dark-theme"
                onClick={() =>
                  dispatch({ type: "TOGGLE_THEME", payload: "dark" })
                }
              />
            </div>
            <div>
              <img
                src={theme === "light" ? LightActive : Light}
                alt="light"
                className="light-theme"
                onClick={() =>
                  dispatch({ type: "TOGGLE_THEME", payload: "light" })
                }
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
