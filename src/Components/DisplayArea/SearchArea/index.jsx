import { useParams } from "react-router-dom";
import { useCallback, useEffect, useReducer } from "react";

//$ custom hooks
import useAuth from "../../../hooks/useAuth";
import { useInfiniteLoad } from "../../../hooks/useInfiniteLoad";

//$ styles
import { CardWrapper, Container, SpinnerWrapper } from "./style";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

//$ reducers
import {
  searchReducer,
  searchInitialState,
} from "../../../reducers/searchReducer";

//$ constants & components
import DisplayCard from "../../DisplayCard";
import { getSearchDatasAPI } from "../../../api";
import { ACTION_TYPES, searchViews } from "../../../constants";

const SearchArea = () => {
  //* custom hook to verify user authentication.
  useAuth();

  //* get the type:{movie/tv} and query:{your searched query} from the url.
  const { type, query } = useParams();

  //* custom hook to handle infinite scrolling.
  const { lastElementRef, elementObserver } = useInfiniteLoad();

  //* useReducers to handle the state of the search area.
  const [state, dispatch] = useReducer(searchReducer, searchInitialState);
  const { loading, view, totalResults, page, searchData, error } = state;

  //* When ever the type:{move/tv} changes, this will reset the state.
  useEffect(() => {
    dispatch({ type: ACTION_TYPES.SET_VIEW, payload: type });
  }, [type]);

  //* To handle the infinite scrolling.
  useEffect(() => {
    const cleanupObserver = elementObserver({
      loading,
      page,
      callBackFn: (res) =>
        dispatch({ type: ACTION_TYPES.SET_PAGE, payload: res }),
    });

    return () => {
      if (cleanupObserver) cleanupObserver();
    };
  }, [page, loading]);

  //* when ever the page/view/query changes, this will fetch the data from the api.
  useEffect(() => {
    if (page !== -1) {
      dispatch({ type: ACTION_TYPES.LOADING });
      getSearchDatasAPI({ page, view, query, searchData, dispatch });
    }
  }, [view, page, query]);

  //* to handle the view change.
  const handleChange = useCallback((_, nextView) => {
    if (nextView) {
      dispatch({ type: ACTION_TYPES.SET_VIEW, payload: nextView });
    }
  }, []);

  return (
    <Container>
      <div className="search-filter">
        <div className="search-view">
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <div className="search-view-title">Search Results</div>
            {searchViews.map((item) => {
              return (
                <ToggleButton
                  key={item.view}
                  value={item.view}
                  aria-label={item.view}
                >
                  <p>
                    {item.title}{" "}
                    {searchData.length > 0 &&
                      view === item.view &&
                      totalResults}
                  </p>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="card-display-area">
        {error ? (
          <h1>No data found</h1>
        ) : (
          <>
            <CardWrapper>
              {searchData.map((item) => (
                <div key={item.id}>
                  <DisplayCard item={item} listenerType={view} />
                </div>
              ))}
            </CardWrapper>
            {loading && (
              <SpinnerWrapper style={{ height: "40px" }}>
                <CircularProgress />
              </SpinnerWrapper>
            )}
            <div style={{ height: "30px" }} ref={lastElementRef}></div>
          </>
        )}
      </div>
    </Container>
  );
};

export default SearchArea;
