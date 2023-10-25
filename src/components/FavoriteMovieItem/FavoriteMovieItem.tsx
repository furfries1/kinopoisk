import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IFavoriteMovie } from "src/interfaces/interfaces";

const FavoriteMovieItem = ({ favoriteMovies }: IFavoriteMovie) => {
  const { name, poster, filmId } = favoriteMovies;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMoviePage = () => {
    navigate(`/movie/${filmId}`);
    dispatch({ type: "SET_SEARCH_VALUE", payload: "" });
  };
  const deleteMovie = () => {
    dispatch({ type: "DELETE_FAVORITE_MOVIE", payload: filmId });
  };
  return (
    <>
      <div className="movie" >
        <img src={poster} alt="poster" />
        <div className="movies-name" onClick={() => openMoviePage()}>{name}</div>
        <span onClick={deleteMovie}>удалить</span>
      </div>

    </>
  );
};

export default FavoriteMovieItem;
