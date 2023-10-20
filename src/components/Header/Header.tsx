import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
import UserIcon from "src/icons/user.svg"
import "./style.scss";
import instance from "src/axiosConfig";

const Header = () => {
  const theme = useSelector(({ theme }) => theme);
  return (
    <header className={`header ${theme === "light" ? "light" : ""}`}>
      <BurgerMenu />
      <div className="search-container">
        <input type="search" placeholder="поиск..." className="search-input" />
      </div>
      <div className="username">
        <div className="person-icon">
          <img src={UserIcon} alt="" />
        </div>
        <span> войти</span>
      </div>
    </header>
  );
};

export default Header;
