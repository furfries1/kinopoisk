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
import "./style.scss";
import { Link } from "react-router-dom";

const Menu: FC<IMenu> = ({ isOpen, setIsOpen }) => {
  const dispatch = useDispatch();
  const theme = useSelector(({ theme }) => theme);
  const menuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(menuRef, () => {
    if (isOpen) {
      setTimeout(() => setIsOpen(false), 250);
    }
  });
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
            <a href="#">закладки</a>
          </div>
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
