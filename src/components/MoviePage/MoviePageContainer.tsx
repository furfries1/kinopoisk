import React, { useEffect } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GET_MOVIE_PAGE } from "src/actions/actions";
import MoviePage from "./MoviePage";


const MoviePageContainer = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const movie = useSelector(({ moviePage }) => moviePage);
  // const movieLinks = useSelector(({ movieLinks }) => movieLinks);
  useEffect(() => {
    dispatch(GET_MOVIE_PAGE(Number(id)));
  }, []);
  return (
    <PageTemplate>
      <MoviePage moviePage={movie} />
    </PageTemplate>
  );
};

export default MoviePageContainer;
