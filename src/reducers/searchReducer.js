// NOTE: This code is not in use.
// TODO: Need to fix the bug before adapting to this code.
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
    case "RESET":
      return {
        ...searchInitialState,
        view: action.payload
      }
    case "LOADING":
      return {
        ...state,
        loading: true,
      };

    case "SET_VIEW":
      return {
        ...state,
        loading: true,
        error: false,
        page: 1,
        searchData: [],
        view: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case "SET_DATA":
      console.log("REDUCER", state.searchData, action.payload.res);
      return {
        ...state,
        searchData: [...state.searchData, ...action.payload.res],
        totalResults: action.payload.totalResults,
        loading: false,
      };
    case "ERROR":
      return {
        ...state,
        error: true,
        totalResults: 0,
        loading: false,
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
