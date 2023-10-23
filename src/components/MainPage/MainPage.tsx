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
  const currentPageMain = useSelector(({ currentPageMain }) => currentPageMain);
  const topMovies = useSelector(({ topMovies }) => topMovies);
  useEffect(() => {
    topMovies && dispatch(GET_TOP_MOVIES(currentPageMain));
  }, []);
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

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { ThunkDispatch } from "redux-thunk";
// import { AnyAction } from "redux";
// import PageTemplate from "src/components/PageTemplate/PageTemplate";
// import Movie from "src/components/Movie/Movie";
// import "./style.scss";
// import { GET_TOP_MOVIES } from "src/actions/actions";
// import { IMovie } from "src/interfaces/interfaces";
// import { createPages } from "src/helpers";
// import { useNavigate } from "react-router-dom";
// import MoviePageTemplate from "src/MoviePageTemplate/MoviePageTemplate";

// const MainPage = () => {
//   const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
//   const navigate = useNavigate();
//   const currentPage = useSelector(({ currentPage }) => currentPage);
//   const topMovies = useSelector(({ topMovies }) => topMovies);
//   useEffect(() => {
//     dispatch(GET_TOP_MOVIES(1));
//   }, []);
//   useEffect(() => {
//     dispatch(GET_TOP_MOVIES(currentPage));
//     navigate(`/main/${currentPage}`);
//   }, [currentPage]);
//   return (
//     <PageTemplate>
//           <MoviePageTemplate movies={topMovies} />
//     </PageTemplate>
//   );
// };

// export default MainPage;
