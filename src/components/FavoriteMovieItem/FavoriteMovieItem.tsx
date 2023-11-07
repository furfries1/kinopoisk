import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IFavoriteMovie } from "src/interfaces/interfaces";
import Close from "src/icons/close.svg";

const FavoriteMovieItem = ({ favoriteMovies, deleteMovie }: IFavoriteMovie) => {
  const { name, poster, filmId } = favoriteMovies;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const openMoviePage = () => {
    navigate(`/movie/${filmId}`);
    dispatch({ type: "SET_SEARCH_VALUE", payload: "" });
  };

  return (
    <>
      <div className="movie">
        <div className="close" onClick={() => deleteMovie(filmId)}>
          <img src={Close} alt="x" />
        </div>
        <img src={poster} alt="poster" onClick={() => openMoviePage()}/>
        <div className="movies-name">
          {name}
        </div>
      </div>
    </>
  );
};

export default FavoriteMovieItem;
