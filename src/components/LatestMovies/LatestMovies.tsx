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
      <div className="movies-container">
        {latestMovies.map((latestMovies: IMovie) => (
          <Movie key={latestMovies.kinopoiskId} movie={latestMovies} />
        ))}
      </div>
      <Pagination pageType="latest" currentPage={currentPageLatest}/>
    </PageTemplate>
  );
};

export default LatestMovies;

// import React, { useEffect } from "react";
// import PageTemplate from "../PageTemplate/PageTemplate";
// import { GET_LATEST_MOVIES } from "src/actions/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";
// import { IMovie } from "src/interfaces/interfaces";
// import Movie from "../Movie/Movie";
// import { createPages } from "src/helpers";
// import MoviePageContainer from "../MoviePage/MoviePageContainer";
// import MoviePageTemplate from "src/MoviePageTemplate/MoviePageTemplate";

// const LatestMovies = () => {
//   const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
//   const latestMovies = useSelector(({ latestMovies }) => latestMovies);
//   const currentPage = useSelector(({ currentPage }) => currentPage);
//   useEffect(() => {
//     dispatch(GET_LATEST_MOVIES(1));
//   }, []);
//   useEffect(() => {
//     dispatch(GET_LATEST_MOVIES(currentPage));
//   }, [currentPage]);
//   return (
//     <PageTemplate>
//       <MoviePageTemplate movies={latestMovies}/>
//     </PageTemplate>
//   );
// };

// export default LatestMovies;