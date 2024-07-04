export const favWlInitialState = {
  data: [],
  view: "movies",
  loading: false,
  page: 1,
  error: null,
};

export function favWLReducer(state, action) {
  switch (action.type) {
    case "RESET":
      return {
        ...favWlInitialState,
      };
    case "LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
        data: [],
        page: 1,
        loading: false,
      };
    case "SET_DATA":
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case "ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SETTLED":
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
