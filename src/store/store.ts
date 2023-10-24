// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// const initialState = {
//   theme: "dark",
//   topMovies: [],
//   latestMovies: [],
//   moviePage: [],
//   movieLinks: [],
//   similarMovies: [],
//   searchMovies: [],
//   isLoading: false,
//   pagesCount: 0,
//   currentPageLatest: 1,
//   currentPageMain: 1,
//   currentPageSearch: 1,
//   searchValue: "",
// };

// const rootReducer = (state = initialState, action: any) => {
//   switch (action.type) {
//     case "TOGGLE_THEME": {
//       return {
//         ...state,
//         theme: action.payload,
//       };
//     }
//     case "SET_TOP_MOVIES": {
//       return {
//         ...state,
//         topMovies: action.payload,
//       };
//     }
//     case "SET_MOVIE_PAGE": {
//       return {
//         ...state,
//         moviePage: action.payload,
//       };
//     }
//     case "SET_MOVIE_LINKS": {
//       return {
//         ...state,
//         movieLinks: action.payload,
//       };
//     }
//     case "SET_SIMILAR_MOVIES": {
//       return {
//         ...state,
//         similarMovies: action.payload,
//       };
//     }
//     case "SET_LOADING": {
//       return {
//         ...state,
//         isLoading: !state.isLoading,
//       };
//     }
//     case "SET_PAGES_COUNT": {
//       return {
//         ...state,
//         pagesCount: action.payload,
//       };
//     }
//     case "SET_CURRENT_PAGE_MAIN": {
//       return {
//         ...state,
//         currentPageMain: action.payload,
//       };
//     }
//     case "SET_CURRENT_PAGE_LATEST": {
//       return {
//         ...state,
//         currentPageLatest: action.payload,
//       };
//     }
//     case "SET_CURRENT_PAGE_SEARCH": {
//       return {
//         ...state,
//         currentPageSearch: action.payload,
//       };
//     }
//     case "SET_LATEST_MOVIES": {
//       return {
//         ...state,
//         latestMovies: action.payload,
//       };
//     }    
//     case "SET_SEARCH_VALUE": {
//       return {
//         ...state,
//         searchValue: action.payload,
//       };
//     }
//     case "SET_SEARCH_MOVIES": {
//       return {
//         ...state,
//         searchMovies: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// export default store;


import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import pagesReducer from "./pagesReducer";
import uiReducer from "./uiReducer";


const rootReducer = combineReducers({
  pages: pagesReducer,
  ui: uiReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;