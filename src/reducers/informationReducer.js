import { ACTION_TYPES } from "../constants";

export const infoInitialState = {
  loading: true,
  tvCrew: {},
  tvRatings: {},
  data: {},
  watchProviders: {},
  headerData: {},
  error: null,
};

export function informationReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.LOADING:
      return {
        ...state,
        loading: true,
        headerData: {},
      };
    case ACTION_TYPES.RESET_HEADER:
      return {
        ...state,
        headerData: {},
      };
    case ACTION_TYPES.SET_HEADER:
      return {
        ...state,
        headerData: action.payload,
      };
    case ACTION_TYPES.SET_DATA:
      return {
        ...state,
        loading: false,
        tvCrew: action.payload[0]?.value?.data,
        tvRatings: action.payload[1]?.value?.data,
        data: action.payload[2]?.value?.data,
        watchProviders: action.payload[3]?.value?.data?.results,
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
