import instance from "src/axiosConfig";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export const GET_TOP_MOVIES = (page: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${page}`)
        .then((response) => {
          let topMovies = response.data.films;
          let pagesCount = response.data.pagesCount;
          dispatch({ type: "SET_TOP_MOVIES", payload: topMovies });
          dispatch({ type: "SET_PAGES_COUNT", payload: pagesCount });
        })
        .then(() => {
          dispatch({ type: "SET_LOADING" });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_MOVIE_PAGE = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`/v2.2/films/${filmId}`)
        .then((response) => {
          dispatch({ type: "SET_MOVIE_PAGE", payload: response.data });
        })
        .then(() => {
          dispatch({ type: "SET_LOADING" });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_MOVIE_LINKS = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      instance
        .get(`/v2.2/films/${filmId}/external_sources?page=1`)
        .then((response) => {
          dispatch({ type: "SET_MOVIE_LINKS", payload: response.data.items });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_SIMILAR_MOVIES = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`/v2.2/films/${filmId}/similars`)
        .then((response) => {
          dispatch({
            type: "SET_SIMILAR_MOVIES",
            payload: response.data.items,
          });
        })
        .then(() => {
          dispatch({ type: "SET_LOADING" });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_LATEST_MOVIES = (page: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=${page}`)
        .then((response) => {
          dispatch({
            type: "SET_PAGES_COUNT",
            payload: response.data.totalPages,
          });
          dispatch({ type: "SET_LATEST_MOVIES", payload: response.data.items });
        })
        .then(() => {
          dispatch({ type: "SET_LOADING" });
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_SEARCH_MOVIES = (keyword: string, page: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(`/v2.1/films/search-by-keyword?keyword=${keyword}&page=${page}`)
        .then((response) => {
          dispatch({
            type: "SET_PAGES_COUNT",
            payload: response.data.pagesCount,
          });
          dispatch({ type: "SET_SEARCH_MOVIES", payload: response.data.films });
        })
        .then(() => {
          dispatch({ type: "SET_LOADING" });
        });
    } catch (err) {
      console.log(err);
    }
  };
};
