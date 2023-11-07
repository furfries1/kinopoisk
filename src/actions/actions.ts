import instance from "src/axiosConfig";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { IUser } from "src/interfaces/interfaces";

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

export const GET_MOVIE_STAFF = (filmId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      instance.get(`/v1/staff?filmId=${filmId}`).then((response) => {
        const directors = response.data.filter(
          (e: any) => e.professionKey === "DIRECTOR"
        );
        const actors = response.data.filter(
          (e: any) => e.professionKey === "ACTOR"
        );
        dispatch({
          type: "SET_MOVIE_DIRECTORS",
          payload: directors.slice(0, 1),
        });
        dispatch({ type: "SET_MOVIE_ACTORS", payload: actors.slice(0, 5) });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const GET_STAFF_PAGE = (staffId: number) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance.get(`/v1/staff/${staffId}`).then((response) => {
        dispatch({ type: "SET_PERSON", payload: response.data });
      })
      .then(() => {
        dispatch({ type: "SET_LOADING" });
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

export const GET_FILTER_ID = () => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      instance.get(`v2.2/films/filters`).then((response) => {
        const filterGenres = response.data.genres
          .filter((e: any) => e.genre !== "")
          .map((e: any) => ({
            value: e.id,
            label: e.genre,
          }));
        const filterCountries = response.data.countries
          .filter((e: any) => e.country !== "")
          .map((e: any) => ({
            value: e.id,
            label: e.country,
          }));
        dispatch({
          type: "SET_FILTER_GENRES",
          payload: filterGenres,
        });
        dispatch({
          type: "SET_FILTER_COUNTRIES",
          payload: filterCountries,
        });
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

export const GET_FILTERED_MOVIES = (
  countries: number,
  genres: number,
  order: string,
  type: string,
  ratingFrom: number,
  ratingTo: number,
  yearFrom: number,
  yearTo: number,
  keyword: string,
  page: number
) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      instance
        .get(
          `/v2.2/films?${countries ? `countries=${countries}` : null}&${
            genres ? `genres=${genres}` : null
          }&order=${order}&type=${type}&ratingFrom=${ratingFrom}&ratingTo=${ratingTo}&yearFrom=${yearFrom}&yearTo=${yearTo}&keyword=${keyword}&page=${page}`
        )
        .then((response) => {
          dispatch({
            type: "SET_PAGES_COUNT",
            payload: response.data.totalPages,
          });
          dispatch({
            type: "SET_FILTERED_MOVIES",
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

//////

export const SIGN_IN = (email: string, password: string, navigate: any) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      let response = await fetch(
        "https://studapi.teachmeskills.by/auth/jwt/create/",
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      let access = data.access;
      let refresh = data.refresh;
      if (access) {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
        navigate("/main/1");
      }
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_LOADING" });
    }
  };
};

export const GET_USER_DATA = () => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    try {
      let token = localStorage.getItem("access");
      let getUserData = await fetch(
        "https://studapi.teachmeskills.by/auth/users/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let userData = await getUserData.json();
      dispatch({ type: "SET_USER", payload: userData });
    } catch (err) {
      console.log(err);
    }
  };
};

export const CREATE_USER = (payload: IUser) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      let response = await fetch(
        "https://studapi.teachmeskills.by/auth/users/",
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      let user = data.results;
      dispatch({ type: "SET_USER", payload: user });
      return user;
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_LOADING" });
    }
  };
};

export const ACTIVATE_USER = (uid: string, token: string, navigate: any) => {
  return async (dispatch: ThunkDispatch<any, {}, AnyAction>) => {
    dispatch({ type: "SET_LOADING" });
    try {
      let responce = await fetch(
        "https://studapi.teachmeskills.by/auth/users/activation/",
        {
          method: "POST",
          body: JSON.stringify({ uid, token }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({ type: "SET_ACTIVATION", payload: true });
      navigate("/signin");
    } catch (err) {
      console.log(err);
    } finally {
      dispatch({ type: "SET_LOADING" });
    }
  };
};
