import instance from "src/axiosConfig";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const GET_TOP_MOVIES = () => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`films/top?type=TOP_250_BEST_FILMS&page=1`)
        .then((response) => {
          let topMovies = response.data.films;
          dispatch({ type: "SET_TOP_MOVIES", payload: topMovies });
        });
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_LOADING" });
    }
  };
};

export const GET_MOVIE_PAGE = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance.get(`films/${filmId}`).then((response) => {
        dispatch({ type: "SET_MOVIE_PAGE", payload: response.data });
      })
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_LOADING" });
    }
  };
};

export const GET_MOVIE_LINKS = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      instance.get(`films/${filmId}/external_sources?page=1`).then((response) => {
        dispatch({ type: "SET_MOVIE_LINKS", payload: response.data.items });
      })
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_SIMILAR_MOVIES = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      instance.get(`films/${filmId}/similars`).then((response) => {
        dispatch({ type: "SET_SIMILAR_MOVIES", payload: response.data.items });
      })
    } catch (err) {
      console.log(err);
    }
  };
};