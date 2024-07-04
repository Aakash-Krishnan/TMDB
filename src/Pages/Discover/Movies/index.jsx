import { useEffect, useReducer } from "react";

import { CardWrapper, DisplayCardContainer, WholeDiv } from "./style";
import { CircularProgress } from "@mui/material";
import { APIInstance, useContentInfo } from "../../../api";
import { getApiUrls, urlType } from "../../../constants";
import DisplayCard from "../../../Components/DisplayCard";
import { SpinnerWrapper } from "../../../Components/DisplayArea/SearchArea/style";
import { useInfiniteLoad } from "../../../hooks/useInfiniteLoad";

const initialState = {
  data: [],
  loading: false,
  page: 1,
  error: null,
};

export function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialState };
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

const DiscoverMovies = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data, loading, page } = state;

  const { handleNavigation } = useContentInfo();

  const { lastElementRef, elementObserver } = useInfiniteLoad();

  useEffect(() => {
    elementObserver({ loading, page, dispatch });
  }, [page, loading]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      if (page === -1) {
        return;
      }
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.DISCOVER_MOVIES_SERIES,
          type: "movie",
          page,
        })
      );
      if (res.data.results.length === 0) {
        dispatch({ type: "SET_PAGE", payload: -1 });
        return;
      }
      dispatch({ type: "SET_DATA", payload: res.data.results });
    } catch (err) {
      console.error(err);
      dispatch({ type: "ERROR", payload: err });
    } finally {
      dispatch({ type: "SETTLED" });
    }
  };

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <h1>Discover Movies</h1>

        <div>
          <CardWrapper>
            {data.length > 0
              ? data.map((item, idx) => {
                  return (
                    <div
                      key={item.id}
                      ref={idx === data.length - 1 ? lastElementRef : null}
                    >
                      <DisplayCard
                        item={item}
                        handleClick={handleNavigation}
                        listenerType={"movie"}
                      />
                    </div>
                  );
                })
              : !loading && (
                  <h1 style={{ marginTop: "20px" }}>No data found</h1>
                )}
          </CardWrapper>
        </div>
        {loading && (
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        )}
      </DisplayCardContainer>

      {/* {<div ref={lastElementRef}></div>} */}
    </WholeDiv>
  );
};

export default DiscoverMovies;
