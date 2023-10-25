import React from "react";
import { ILinks } from "src/interfaces/interfaces";
import './style.scss'


const MovieLinks = ({ link }: ILinks) => {
  const { url, platform, logoUrl } = link;

  return (
    <div className="link-item">
        <img src={logoUrl} alt="logo" className="link-logo"/>
        <span className="link-name">{platform}</span>
    </div>
  );
};

export default MovieLinks;
