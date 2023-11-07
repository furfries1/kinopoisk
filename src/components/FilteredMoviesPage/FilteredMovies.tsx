import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageTemplate from "../PageTemplate/PageTemplate";
import { IMovie } from "src/interfaces/interfaces";
import Movie from "../Movie/Movie";
import Pagination from "../Pagination/Pagination";
import { GET_FILTERED_MOVIES } from "src/actions/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useNavigate } from "react-router-dom";

const FilteredMovies = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const filteredMovies = useSelector(({ pages }) => pages.filteredMovies);
  const currentPageFilter = useSelector(({ pages }) => pages.currentPageFilter);
  const filterParams = useSelector(({ pages }) => pages.filterParams);
  useEffect(() => {
    if (JSON.stringify(filterParams) === "{}") {
      navigate("/main/1");
      dispatch({ type: "SET_FILTERED_MOVIES", payload: [] });
    } else if (currentPageFilter !== 1) {
      dispatch(
        GET_FILTERED_MOVIES(
          filterParams.country,
          filterParams.genre,
          filterParams.sortBy,
          filterParams.type,
          filterParams.ratingMin,
          filterParams.ratingMax,
          filterParams.yearMin,
          filterParams.yearMax,
          filterParams.keyword,
          currentPageFilter
        )
      );
    }
  }, [currentPageFilter]);

  return (
    <PageTemplate>
      <>
        <div className="movies-container">
          {filteredMovies.map((movie: IMovie) => (
            <Movie key={movie.filmId} movie={movie} />
          ))}
        </div>
        <Pagination pageType="filter" currentPage={currentPageFilter} />
      </>
    </PageTemplate>
  );
};

export default FilteredMovies;
