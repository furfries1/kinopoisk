import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import MoviePageContainer from "./components/MoviePage/MoviePageContainer";
import SimilarMovies from "./components/SimilarMovies/SimilarMovies";
import LatestMovies from "./components/LatestMovies/LatestMovies";
import SearchPage from "./components/SearchPage/SearchPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { decodeJwt, expToMinutes, updateAccessToken } from "./helpers";
import FavoriteMoviesPage from "./components/FavoriteMoviesPage/FavoriteMoviesPage";

export let remainingMinutes: number;

function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const token = localStorage.getItem("access");
  const startTokenRefreshTimer = () => {
    if (!token) return null;
    const expirationTimestamp = decodeJwt(token).payload.exp;
    const currentTime = Date.now();
    const timeUntilExpiration = expirationTimestamp * 1000 - currentTime;

    if (timeUntilExpiration > 20000) {
      setInterval(updateAccessToken, timeUntilExpiration - 20000);
    } else {
      localStorage.removeItem("access");
    }
    if (token) {
      const JWTData = decodeJwt(token);
      let expTimestamp = JWTData.payload.exp;
      let remainingMinutes = expToMinutes(expTimestamp);
      console.log("remaining:" + remainingMinutes);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", (event) => {
      console.log(event);
      if (event.key === "access" && event.newValue === null) {
        navigate("/sign-in");
      }
    });
    startTokenRefreshTimer();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/main/:page" element={<MainPage />} />
        <Route path="/movie/:id" element={<MoviePageContainer />} />
        <Route path="/similar/:name" element={<SimilarMovies />} />
        <Route path="/latest/:page" element={<LatestMovies />} />
        <Route path="/favorites" element={<FavoriteMoviesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/moviepage" element={<MoviePageContainer />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      {location.pathname === "/" && <Navigate to="/main/1" />}
      {location.pathname === "/latest" && <Navigate to="/latest/1" />}
    </>
  );
}

export default App;
