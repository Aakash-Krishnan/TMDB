import { ACTION_TYPES } from "../constants";

// NOTE: This code is not in use. Changed this to redux....
export const homeInitialState = {
  loading: true,
  data: [],
  specials: "",
  error: null,
};

export function homeReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET:
      return {
        ...homeInitialState,
      };
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.SET_SPECIALS:
      return {
        ...state,
        specials: action.payload,
      };
    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        data: action.payload,
        loading: false,
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
