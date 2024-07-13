import { ACTION_TYPES } from "../constants";

export const bodyInfoInitialState = {
  loading: true,
  view: "videos",
  images: {},
  recommendations: [],
  error: null,
};

export function bodyInfoReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };

    case ACTION_TYPES.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case ACTION_TYPES.SET_VIEW:
      return {
        ...state,
        view: action.payload,
      };
    case ACTION_TYPES.SET_RECOMMENDATIONS:
      return {
        ...state,
        loading: false,
        recommendations: action.payload,
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
