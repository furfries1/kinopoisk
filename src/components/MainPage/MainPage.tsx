import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import PageTemplate from "src/components/PageTemplate/PageTemplate";
import Movie from "src/components/Movie/Movie";
import "./style.scss";
import { GET_TOP_MOVIES } from "src/actions/actions";
import { IMovie } from "src/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const MainPage = () => {
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const currentPageMain = useSelector(({ pages }) => pages.currentPageMain);
  const topMovies = useSelector(({ pages }) => pages.topMovies);
  // useEffect(() => {
  //   dispatch(GET_TOP_MOVIES(currentPageMain));
  // }, []);
  useEffect(() => {
    dispatch(GET_TOP_MOVIES(currentPageMain));
    navigate(`/main/${currentPageMain}`);
  }, [currentPageMain]);
  return (
    <PageTemplate>
      <div className="movies-container">
        {topMovies.map((movie: IMovie) => (
          <Movie key={movie.filmId} movie={movie} />
        ))}
      </div>
      <Pagination pageType="main" currentPage={currentPageMain}/>
    </PageTemplate>
  );
};

export default MainPage;

