const initialState = {
  topMovies: [],
  latestMovies: [],
  moviePage: [],
  movieLinks: [],
  similarMovies: [],
  searchMovies: [],
  favoriteMovies: [],
  pagesCount: 0,
  currentPageLatest: 1,
  currentPageMain: 1,
  currentPageSearch: 1,
};

const pagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_TOP_MOVIES": {
      return {
        ...state,
        topMovies: action.payload,
      };
    }
    case "SET_FAVORITE_MOVIES": {
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies.concat(action.payload)],
      };
    }
    case "DELETE_FAVORITE_MOVIE": {
      return {
        ...state,
        favoriteMovies: [...state.favoriteMovies.filter((el: any) => el.filmId !== action.payload)],
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
    case "SET_PAGES_COUNT": {
      return {
        ...state,
        pagesCount: action.payload,
      };
    }
    case "SET_CURRENT_PAGE_MAIN": {
      return {
        ...state,
        currentPageMain: action.payload,
      };
    }
    case "SET_CURRENT_PAGE_LATEST": {
      return {
        ...state,
        currentPageLatest: action.payload,
      };
    }
    case "SET_CURRENT_PAGE_SEARCH": {
      return {
        ...state,
        currentPageSearch: action.payload,
      };
    }
    case "SET_LATEST_MOVIES": {
      return {
        ...state,
        latestMovies: action.payload,
      };
    }
    case "SET_SEARCH_MOVIES": {
      return {
        ...state,
        searchMovies: action.payload,
      };
    }
    case "SET_SEARCH_VALUE": {
      return {
        ...state,
        searchValue: action.payload,
      };
    }
    default:
      return state;
  }
};

export default pagesReducer;
