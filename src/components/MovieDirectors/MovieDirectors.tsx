import React from "react";
import { IDirector } from "src/interfaces/interfaces";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const MovieDirectors = ({ director }: IDirector) => {
  const navigate = useNavigate();
  const { staffId, nameRu, posterUrl, professionText, professionKey } =
    director;
  const openStaffPage = () => {
    navigate(`/staff/${staffId}`);
  };
  return (
    <div className="director-name" onClick={openStaffPage}>
      {nameRu}
    </div>
  );
};

export default MovieDirectors;
