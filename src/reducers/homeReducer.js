export const homeInitialState = {
  loading: true,
  data: [],
  specials: "",
  error: null,
};

export function homeReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...homeInitialState,
        loading: true,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_SPECIALS":
      return {
        ...state,
        loading: true,
        specials: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
