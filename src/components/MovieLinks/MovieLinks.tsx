import React from "react";
import { ILinks } from "src/interfaces/interfaces";
import "./style.scss";

const MovieLinks = ({ link }: ILinks) => {
  const { url, platform, logoUrl } = link;

  return (
    <div className="link-item">
      <a href={url}>
        <img src={logoUrl} alt="logo" className="link-logo" />
      </a>
      <span className="link-name">{platform}</span>
    </div>
  );
};

export default MovieLinks;
