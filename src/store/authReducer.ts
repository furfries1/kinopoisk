const initialState = {
  user: {
    email: "",
    id: null,
    username: "",
  },
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "REMOVE_USER": {
      return {
        ...state,
        user: {
          ...state.user,
          username: "",
          email: "",
          id: null,
        },
      };
    }
    case "SET_ACTIVATION": {
      return {
        ...state,
        user: { ...state.user, isActivated: true },
      };
    }
    default:
      return state;
  }
};

export default authReducer;
