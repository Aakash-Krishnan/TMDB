export const bodyInfoInitialState = {
  loading: true,
  view: "videos",
  images: {},
  recommendations: [],
  error: null,
};

export function bodyInfoReducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    case "SET_VIEW":
      return {
        ...state,
        view: action.payload,
      };
    case "SET_RECOMMENDATIONS":
      console.log("RECOMMENDATIONS", action.payload);
      return {
        ...state,
        loading: false,
        recommendations: action.payload,
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
