import React, { useEffect } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { GET_LATEST_MOVIES } from "src/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { IMovie } from "src/interfaces/interfaces";
import Movie from "../Movie/Movie";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";

const LatestMovies = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const latestMovies = useSelector(({ pages }) => pages.latestMovies);
  const currentPageLatest = useSelector(({ pages }) => pages.currentPageLatest);
  useEffect(() => {
    dispatch(GET_LATEST_MOVIES(currentPageLatest));
    navigate(`/latest/${currentPageLatest}`);
  }, [currentPageLatest]);
  return (
    <PageTemplate>
      <>
      <div className="movies-container">
        {latestMovies.map((latestMovies: IMovie) => (
          <Movie key={latestMovies.kinopoiskId} movie={latestMovies} />
        ))}
      </div>
      <Pagination pageType="latest" currentPage={currentPageLatest}/>
      </>
    </PageTemplate>
  );
};

export default LatestMovies;
