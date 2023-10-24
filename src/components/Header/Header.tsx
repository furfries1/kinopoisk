import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
import UserIcon from "src/icons/user.svg";
import "./style.scss";
import { Navigate } from "react-router-dom";
import useDebounce from "src/hooks/useDebounce";

const Header = () => {
  const dispatch = useDispatch();
  const theme = useSelector(({ ui }) => ui.theme);
  const searchValue = useSelector(({ pages }) => pages.searchValue);
  const debouncedSearchTerm = useDebounce(searchValue, 500);

  return (
    <header className={`header ${theme === "light" ? "light" : ""}`}>
      <BurgerMenu />
      <div className="search-container">
        <input
          type="search"
          placeholder="поиск..."
          className="search-input"
          value={searchValue || ""}
          onChange={(e) =>
            dispatch({
              type: "SET_SEARCH_VALUE",
              payload: e.currentTarget.value,
            })
          }
        />
      </div>
      <div className="username">
        <div className="person-icon">
          <img src={UserIcon} alt="" />
        </div>
        <span> войти</span>
      </div>
      {debouncedSearchTerm && debouncedSearchTerm.length >= 2 ? <Navigate to="/search/" /> : null}
    </header>
  );
};

export default Header;
