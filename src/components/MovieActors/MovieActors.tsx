import React from 'react'
import { IActor } from "src/interfaces/interfaces";
import "./style.scss"
import { useNavigate } from 'react-router-dom';

const MovieActors = ({actor} : IActor) => {
  const navigate = useNavigate()
  const { staffId, nameRu, posterUrl, professionText, professionKey } =
    actor;
  const openStaffPage = () => {
    navigate(`/staff/${staffId}`)
  }
  return (
    <div className='actor-name' onClick={openStaffPage}>{nameRu}</div>
  )
}

export default MovieActors
