import React from 'react'
import PageTemplate from '../PageTemplate/PageTemplate'
import { useSelector } from 'react-redux'
import { IMovie } from 'src/interfaces/interfaces'
import Movie from '../Movie/Movie'
import './style.scss'
import { useParams } from 'react-router-dom'
import ErrorPage from '../ErrorPage/ErrorPage'

const SimilarMovies = () => {
    const { name } = useParams<{ name: string }>();
    const similarMovies = useSelector(({similarMovies}) => similarMovies)
  return (
    <PageTemplate>
      {similarMovies.length !== 0 ?  
      <>
      <h2 className='similar-header'>Похожие на «{name}»</h2>
        <div className="similar-movies-container">
         { similarMovies.map((similarMovies : IMovie) => (
                <Movie key={similarMovies.filmId} movie={similarMovies}/>
            ))}
        </div>
        </>
        : <ErrorPage/>
}
    </PageTemplate>
  )
}

export default SimilarMovies
