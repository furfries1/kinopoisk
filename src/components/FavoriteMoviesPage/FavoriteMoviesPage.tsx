import React, { useEffect, useState } from "react";
import PageTemplate from "../PageTemplate/PageTemplate";
import { IFavoriteMovies, IMovie } from "src/interfaces/interfaces";
import FavoriteMovieItem from "../FavoriteMovieItem/FavoriteMovieItem";

const FavoriteMoviesPage = () => {
  const [favMovies, setFavMovies] = useState([]);
  let storageFavoriteMovies: any = localStorage.getItem("favoriteMovies")
  let favoriteMovies = JSON.parse(storageFavoriteMovies);
  useEffect(() => {
    setFavMovies(favoriteMovies);
  }, [storageFavoriteMovies]);
  const deleteMovie = (filmId: number) => {
    localStorage.setItem(
      "favoriteMovies",
      JSON.stringify(
        JSON.parse(localStorage.getItem("favoriteMovies") ?? "[]").filter(
          (item: any) => item.filmId !== filmId
        )
      )
    );
    storageFavoriteMovies = localStorage.getItem("favoriteMovies");
    setFavMovies(JSON.parse(storageFavoriteMovies));
  };
  return (
    <PageTemplate>
      <div className="similar-movies-container">
        {favoriteMovies.length !== 0 ?
          favMovies.map((favoriteMovies: IFavoriteMovies) => (
            <FavoriteMovieItem
              key={favoriteMovies.filmId}
              favoriteMovies={favoriteMovies}
              deleteMovie={deleteMovie}
            />
          ))
        : <div className="similar-header"> нет избранных фильмов </div>
        }
      </div>
    </PageTemplate>
  );
};

export default FavoriteMoviesPage;
