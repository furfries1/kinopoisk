import React from 'react'
import PageTemplate from '../PageTemplate/PageTemplate'
import { useSelector } from 'react-redux'
import { IFavoriteMovies, IMovie } from 'src/interfaces/interfaces'
import Movie from '../Movie/Movie'
import FavoriteMovieItem from '../FavoriteMovieItem/FavoriteMovieItem'

const FavoriteMoviesPage = () => {
    const favoriteMovies = useSelector(({pages}) => pages.favoriteMovies)
  return (
    <PageTemplate>
        <div className="similar-movies-container">
         { favoriteMovies.map((favoriteMovies : IFavoriteMovies) => (
                <FavoriteMovieItem key={favoriteMovies.filmId} favoriteMovies={favoriteMovies}/>
            ))}
        </div>
    </PageTemplate>
  )
}

export default FavoriteMoviesPage
