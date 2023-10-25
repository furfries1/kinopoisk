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

const Header = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const theme = useSelector(({ ui }) => ui.theme);
  const searchValue = useSelector(({ pages }) => pages.searchValue);
  const user = useSelector(({ auth }) => auth.user);
  const favoriteMovies = useSelector(({pages}) => pages.favoriteMovies)
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  const token = localStorage.getItem("access");
  const storageMovies: any = localStorage.getItem("favoriteMovies");
  useEffect(() => {
    if (token) {
      dispatch(GET_USER_DATA());
    }
  }, []);
  useEffect(() => {

    if(favoriteMovies.length === 0 && storageMovies) {
      let arr = JSON.parse(storageMovies) 
      dispatch({type: "SET_FAVORITE_MOVIES", payload: arr})
    }
    if (favoriteMovies.length !== 0) {
      localStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies))
    }
  }, [favoriteMovies]);
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
      <div className="username" onClick={() => navigate('/signin')}>
        <div className="person-icon">
          <img src={UserIcon} alt="" />
        </div>
        <span> {token ? user.username : 'войти'}</span>
      </div>
      {debouncedSearchTerm && debouncedSearchTerm.length >= 2 ? <Navigate to="/search/" /> : null}
    </header>
  );
};

export default Header;
