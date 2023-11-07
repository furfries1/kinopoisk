import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenu from "src/components/BurgerMenu/BurgerMenu";
import UserIcon from "src/icons/user.svg";
import "./style.scss";
import { Navigate, useNavigate } from "react-router-dom";
import useDebounce from "src/hooks/useDebounce";
import { GET_USER_DATA } from "src/actions/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import FilterMenu from "../FilterMenu/FilterMenu";

const Header = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const theme = useSelector(({ ui }) => ui.theme);
  const searchValue = useSelector(({ pages }) => pages.searchValue);
  const user = useSelector(({ auth }) => auth.user);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const token = localStorage.getItem("access");
  useEffect(() => {
    if (token) {
      dispatch(GET_USER_DATA());
    }
  }, []);
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
        <FilterMenu />
      </div>
      <div className="username" onClick={() => token ? navigate("/favorites") : navigate("/signin")}>
        <div className="person-icon">
          <img src={UserIcon} alt="" />
        </div>
        <span> {token ? user.username : "войти"}</span>
      </div>
      {debouncedSearchTerm && debouncedSearchTerm.length >= 2 ? (
        <Navigate to="/search/" />
      ) : null}
    </header>
  );
};

export default Header;
