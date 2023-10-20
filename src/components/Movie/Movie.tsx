import React, { useEffect } from "react";
import "./style.scss";
import { IMovies } from "src/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { GET_MOVIE_PAGE } from "src/actions/actions";

const Movie = ({ movie }: IMovies) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const { nameRu, genres, countries, rating, posterUrlPreview, year, filmId, relationType } =
    movie;
  const openMoviePage = () => {
    navigate(`/movie/${filmId}`);
  };
  return (
    <div className="movie" onClick={() => openMoviePage()}>
      <div className="movie-rating">{rating}</div>
      <img src={posterUrlPreview} alt="poster" />
      <div className="movies-name">{nameRu}</div>
      { !relationType && <div className="movies-genres">
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
}
    </div>
  );
};

export default Movie;
