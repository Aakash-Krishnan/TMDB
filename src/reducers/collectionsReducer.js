import { ACTION_TYPES } from "../constants";

export const collectionsInitialState = {
  data: [],
  view: "movies",
  loading: false,
  page: 1,
  error: null,
};

export function collectionsReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET:
      return {
        ...collectionsInitialState,
        view: action.payload,
        loading: true,
      };
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTION_TYPES.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ACTION_TYPES.SETTLED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
