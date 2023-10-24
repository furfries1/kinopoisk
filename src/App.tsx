import React from "react";
import "./App.css";
import MoviePage from "./components/MoviePage/MoviePage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import MoviePageContainer from "./components/MoviePage/MoviePageContainer";
import SimilarMovies from "./components/SimilarMovies/SimilarMovies";
import LatestMovies from "./components/LatestMovies/LatestMovies";
import SearchPage from "./components/SearchPage/SearchPage";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/main/:page" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePageContainer />} />
        <Route path="/similar/:name" element={<SimilarMovies />} />
        <Route path="/latest/:page" element={<LatestMovies />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/moviepage" element={<MoviePageContainer />} />
      </Routes>
      {location.pathname === "/" && <Navigate to="/main/1" />}
      {location.pathname === "/latest" && <Navigate to="/latest/1" />}
    </>
  );
}

export default App;
