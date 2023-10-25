import React from "react";
import "./style.scss";
import { IMovies } from "src/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { getRatingColor } from "src/helpers";
import { useDispatch } from "react-redux";

const Movie = ({ movie }: IMovies ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    nameRu,
    genres,
    countries,
    rating,
    posterUrlPreview,
    year,
    filmId,
    relationType,
    kinopoiskId,
    ratingKinopoisk,
  } = movie;
  const openMoviePage = () => {
    navigate(`/movie/${kinopoiskId ? kinopoiskId : filmId}`);
    dispatch({ type: "SET_SEARCH_VALUE", payload: '' });
  };
  let totalRating: any = rating ? rating : ratingKinopoisk;

  return (
    <div className="movie" onClick={() => openMoviePage()}>
      <div className={getRatingColor(totalRating)}>{totalRating}</div>
      <img src={posterUrlPreview} alt="poster" />
      <div className="movies-name">{nameRu}</div>
      {!relationType && (
        <div className="movies-genres">
          {genres
            ? genres
                .map((e) => e.genre)
                .slice(0, 1)
                .join()
            : null}{" "}
          |{" "}
          <span>
            {countries
              ? countries
                  .map((e) => e.country)
                  .slice(0, 1)
                  .join()
              : null}
            , {year}
          </span>
        </div>
      )}
    </div>
  );
};

export default Movie;
