import React, { useEffect, useState } from "react";
import "./style.scss";
import { ILink, IMoviePage, IStaff } from "src/interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import MovieLinks from "../MovieLinks/MovieLinks";
import { GET_MOVIE_LINKS, GET_SIMILAR_MOVIES } from "src/actions/actions";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Arrow from "src/icons/arrow.svg";
import Fav from "src/icons/fav-white.svg";
import { useNavigate } from "react-router-dom";
import MovieDirectors from "../MovieDirectors/MovieDirectors";
import MovieActors from "../MovieActors/MovieActors";
import { spawn } from "child_process";

const MoviePage = ({ moviePage }: IMoviePage) => {
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, {}, AnyAction>>();
  const navigate = useNavigate();
  const movieLinks = useSelector(({ pages }) => pages.movieLinks);
  const actors = useSelector(({ pages }) => pages.movieActors);
  const directors = useSelector(({ pages }) => pages.movieDirectors);
  const {
    nameRu,
    nameOriginal,
    posterUrlPreview,
    shortDescription,
    year,
    filmLength,
    slogan,
    ratingImdb,
    ratingKinopoisk,
    description,
    genres,
    countries,
    kinopoiskId,
  } = moviePage;
  const linksHandler = () => {
    dispatch(GET_MOVIE_LINKS(kinopoiskId));
    setIsLinksOpen((prevState) => !prevState);
  };
  const similarHandler = () => {
    dispatch(GET_SIMILAR_MOVIES(kinopoiskId));
    navigate(`/similar/${nameRu}`);
  };
  let favMovies: any = localStorage.getItem("favoriteMovies");
  const addToFavorites = () => {
    let favoriteMoviesObj = {
      filmId: kinopoiskId,
      poster: posterUrlPreview,
      name: nameRu,
    };
    setIsFav(true);
    const arr = JSON.parse(favMovies) || [];
    arr.push(favoriteMoviesObj);
    localStorage.setItem("favoriteMovies", JSON.stringify(arr));
  };
  const removeFromFavorites = () => {
    setIsFav(false);
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(
        JSON.parse(localStorage.getItem("favoriteMovies") ?? "[]").filter(
          (item: any) => item.filmId !== kinopoiskId
        )
      )
    );
  };
  useEffect(() => {
    const arr = JSON.parse(favMovies) || [];
    let storageId = arr.find((e: any) => e.filmId === kinopoiskId);
    if (storageId) {
      setIsFav(true);
    }
  }, []);

  return (
    <div className="movie-container">
      <div className="poster">
        <img src={posterUrlPreview} alt="poster" />
        {isFav ? (
          <div className="add-to-fav" onClick={() => removeFromFavorites()}>
            <img src={Fav} alt="fav" />
            <span>добавлено</span>
          </div>
        ) : (
          <div className="add-to-fav" onClick={() => addToFavorites()}>
            <img src={Fav} alt="fav" />
            <span>в коллекцию</span>
          </div>
        )}
      </div>
      <div className="movie-info-container">
        <div className="movie-info-short">
          <div className="movie-name">{nameRu}</div>
          <div className="movie-name-en">{nameOriginal}</div>
          <div className="short-description">{shortDescription}</div>
        </div>
        <div className="movie-info-long">
          <div className="movie-info-header">О фильме:</div>
          <div className="movie-year">
            <span>Год:</span> {year}
          </div>
          <div className="movie-genres">
            <span>Режиссер:</span>{" "}
            {directors.map((director: IStaff) => (
              <MovieDirectors key={director.staffId} director={director} />
            ))}
          </div>
          <div className="movie-genres">
            <span>Жанр:</span>{" "}
            {genres ? genres.map((e: any) => e.genre).join(", ") : null}
          </div>
          <div className="movie-country">
            <span>Страна:</span>{" "}
            {countries ? countries.map((e: any) => e.country).join(", ") : null}
          </div>
          <div className="movie-length">
            <span>Время:</span> {filmLength} мин
          </div>
          <div className="imdb-rating">
            <span>IMDB:</span> {ratingImdb ? ratingImdb : "-"}
          </div>
          <div className="imdb-rating">
            <span>Кинопоиск:</span> {ratingKinopoisk ? ratingKinopoisk : "-"}
          </div>
          <div className="slogan">
            <span>Слоган:</span> «{slogan ? slogan : "-"}»
          </div>
          <div className="description">{description}</div>
          <div className="actors">
            <span>В ролях:</span>
            {
               actors.map((actor: IStaff) => (
                <MovieActors key={actors.staffId} actor={actor} />
              ))
              
            }
          </div>
          <div className="similar" onClick={similarHandler}>
            Показать похожие <img src={Arrow} alt="arrow" className="right" />
          </div>
          <div className="links">
            <div className="links-header" onClick={linksHandler}>
              Где посмотреть{" "}
              {!isLinksOpen ? (
                <img src={Arrow} alt="arrow" />
              ) : (
                <img src={Arrow} alt="arrow" className="rotate" />
              )}
            </div>
            {isLinksOpen &&
              movieLinks.map((link: ILink) => (
                <MovieLinks key={link.logoUrl} link={link} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
