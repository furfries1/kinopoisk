const initialState = {
  topMovies: [],
  latestMovies: [],
  moviePage: [],
  movieLinks: [],
  similarMovies: [],
  searchMovies: [],
  movieDirectors: [],
  movieActors: [],
  person: [],
  filterGenres: [],
  filterCountries: [],
  filteredMovies: [],
  filterParams: {},
  pagesCount: 0,
  currentPageLatest: 1,
  currentPageMain: 1,
  currentPageSearch: 1,
  currentPageFilter: 1,
};

const pagesReducer = (state = initialState, action: any) => {
  switch (action.type) {
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
    case "SET_PERSON": {
      return {
        ...state,
        person: action.payload,
      };
    }
    case "SET_FILTER_GENRES": {
      return {
        ...state,
        filterGenres: action.payload,
      };
    }
    case "SET_FILTER_COUNTRIES": {
      return {
        ...state,
        filterCountries: action.payload,
      };
    }
    case "SET_MOVIE_LINKS": {
      return {
        ...state,
        movieLinks: action.payload,
      };
    }
    case "SET_MOVIE_DIRECTORS": {
      return {
        ...state,
        movieDirectors: action.payload,
      };
    }
    case "SET_MOVIE_ACTORS": {
      return {
        ...state,
        movieActors: action.payload,
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
    case "SET_CURRENT_PAGE_FILTER": {
      return {
        ...state,
        currentPageFilter: action.payload,
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
    case "SET_FILTERED_MOVIES": {
      return {
        ...state,
        filteredMovies: action.payload,
      };
    }
    case "SET_FILTER_PARAMS": {
      return {
        ...state,
        filterParams: action.payload,
      };
    }
    default:
      return state;
  }
};

export default pagesReducer;
