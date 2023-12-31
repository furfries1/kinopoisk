import React, { useEffect } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GET_MOVIE_PAGE, GET_MOVIE_STAFF } from "src/actions/actions";
import MoviePage from "./MoviePage";


const MoviePageContainer = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const movie = useSelector(({ pages }) => pages.moviePage);
  useEffect(() => {
    dispatch(GET_MOVIE_PAGE(Number(id)));
    dispatch(GET_MOVIE_STAFF(Number(id)));
  }, []);
  return (
    <PageTemplate>
      <MoviePage moviePage={movie} />
    </PageTemplate>
  );
};

export default MoviePageContainer;
