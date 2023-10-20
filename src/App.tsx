import React from "react";
import "./App.css";
import MoviePage from "./components/MoviePage/MoviePage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import MoviePageContainer from "./components/MoviePage/MoviePageContainer";
import Spinner from "./components/Spinner/Spinner";
import SimilarMovies from "./components/SimilarMovies/SimilarMovies";

function App() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePageContainer />} />
        <Route path="/similar/:name" element={<SimilarMovies />} />
      </Routes>
      {location.pathname === "/" && <Navigate to="/main" />}
    </>
  );
}

export default App;
