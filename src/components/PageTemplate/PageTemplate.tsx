import React, { FC, ReactNode, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "src/components/Header/Header";
import "./style.scss";
import { IPageTemplate } from "src/interfaces/interfaces";
import Spinner from "../Spinner/Spinner";

const PageTemplate: FC<IPageTemplate> = ({ children }) => {
  const theme = useSelector(({ ui }) => ui.theme);
  const isLoading = useSelector(({ ui }) => ui.isLoading);
  return (
    <div className={`page-template ${theme === "dark" ? "dark" : ""}`}>
      <Header />
      <main className={` ${theme === "dark" ? "dark" : ""} `}>
        <div className="children-container">
          {isLoading ? <Spinner /> : children}
        </div>
      </main>
      <footer className={` ${theme === "dark" ? "dark" : ""}`}>
        <span>2023</span>
        <span>All rights reserved</span>
      </footer>
    </div>
  );
};

export default PageTemplate;
