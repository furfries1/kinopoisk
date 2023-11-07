import React, { useEffect } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { useDispatch, useSelector } from "react-redux";
import { IMovie } from "src/interfaces/interfaces";
import Movie from "../Movie/Movie";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GET_SEARCH_MOVIES } from "src/actions/actions";
import useDebounce from "src/hooks/useDebounce";
import Pagination from "../Pagination/Pagination";

const SearchPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const searchValue = useSelector(({ pages }) => pages.searchValue);
  const searchMovies = useSelector(({ pages }) => pages.searchMovies);
  const currentPageSearch = useSelector(({ pages }) => pages.currentPageSearch);
  const debouncedSearchTerm = useDebounce(searchValue, 500);
  useEffect(() => {
    if (searchValue) {
      dispatch(GET_SEARCH_MOVIES(debouncedSearchTerm, currentPageSearch));
    }
    if (!searchValue) {
      navigate("/main/1");
      dispatch({ type: "SET_SEARCH_MOVIES", payload: [] });
    }
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if (currentPageSearch) {
      dispatch(GET_SEARCH_MOVIES(debouncedSearchTerm, currentPageSearch));
    }
  }, [currentPageSearch]);
  return (
    <PageTemplate>
      <>
        <h2>Результаты по запросу: «{debouncedSearchTerm}»</h2>
        <div className="movies-container">
          {searchMovies.map((movie: IMovie) => (
            <Movie key={movie.filmId} movie={movie} />
          ))}
        </div>
        <Pagination pageType="search" currentPage={currentPageSearch} />
      </>
    </PageTemplate>
  );
};

export default SearchPage;
