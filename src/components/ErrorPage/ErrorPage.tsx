import React from 'react'
import { useNavigate } from 'react-router-dom'
import Error from "src/icons/error.svg"
import "./style.scss"

const ErrorPage = () => {
    const navigate = useNavigate()
  return (
    <div className='error-container'>
        <img src={Error} alt="error" className='error-img'/>
      <p className='error-text'>извините, нет информации :( </p>
      <button onClick={() => navigate(-1)} className='error-button'>назад</button>
    </div>
  )
}

export default ErrorPage
