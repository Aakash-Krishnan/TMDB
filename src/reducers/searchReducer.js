import { ACTION_TYPES } from "../constants";

export const searchInitialState = {
  loading: false,
  view: "movie",
  totalResults: 0,
  page: 1,
  searchData: [],
  error: false,
};

export function searchReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.RESET:
      return {
        ...searchInitialState,
        view: action.payload,
      };
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
      };

    case ACTION_TYPES.SET_VIEW:
      return {
        ...state,
        loading: true,
        error: false,
        page: 1,
        searchData: [],
        view: action.payload,
      };
    case ACTION_TYPES.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        searchData: [...state.searchData, ...action.payload.res],
        totalResults: action.payload.totalResults,
        loading: false,
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        error: true,
        totalResults: 0,
        loading: false,
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
