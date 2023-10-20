import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {
  theme: "dark",
  topMovies: [],
  moviePage: [],
  movieLinks: [],
  similarMovies: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        theme: action.payload,
      };
    }
    case "SET_TOP_MOVIES": {
      return {
        ...state,
        topMovies: action.payload,
      };
    }
    case "SET_MOVIE_PAGE": {
      return {
        ...state,
        moviePage: action.payload,
      };
    }
    case "SET_MOVIE_LINKS": {
      return {
        ...state,
        movieLinks: action.payload,
      };
    }
    case "SET_SIMILAR_MOVIES": {
      return {
        ...state,
        similarMovies: action.payload,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    }
    default:
      return state;
  }
};

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
