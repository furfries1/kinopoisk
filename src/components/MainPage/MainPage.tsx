import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import PageTemplate from "src/components/PageTemplate/PageTemplate";
import Movie from "src/components/Movie/Movie";
import "./style.scss";
import { GET_TOP_MOVIES } from "src/actions/actions";
import { IMovie } from "src/interfaces/interfaces";

const MainPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const topMovies = useSelector(({ topMovies }) => topMovies);
  useEffect(() => {
    topMovies && dispatch(GET_TOP_MOVIES());
  }, []);
  return (
    <PageTemplate>
      <div className="movies-container">
        {topMovies.map((movie: IMovie) => (
          <Movie key={movie.filmId} movie={movie} />
        ))}
      </div>
    </PageTemplate>
  );
};

export default MainPage;
