const initialState = {
  theme: "dark",
  isLoading: false,
};

const uiReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "TOGGLE_THEME": {
      return {
        ...state,
        theme: action.payload,
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

export default uiReducer