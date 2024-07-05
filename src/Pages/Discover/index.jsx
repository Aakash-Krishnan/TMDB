/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";

import { CardWrapper, DisplayCardContainer, WholeDiv } from "./style";
import { CircularProgress } from "@mui/material";
import { APIInstance } from "../../api";
import { getApiUrls, urlType } from "../../constants";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";
import { useParams } from "react-router-dom";
import {
  collectionsInitialState,
  collectionsReducer,
} from "../../reducers/collectionsReducer";

const Discover = () => {
  const { discoverType } = useParams();
  const type = discoverType.split("-")[0];

  const [state, dispatch] = useReducer(
    collectionsReducer,
    collectionsInitialState
  );
  const { data, loading, page, view } = state;

  const { lastElementRef, elementObserver } = useInfiniteLoad();

  useEffect(() => {
    dispatch({ type: "RESET", action: view });
  }, [discoverType]);

  useEffect(() => {
    elementObserver({
      loading,
      page,
      callBackFn: (res) => dispatch({ type: "SET_PAGE", payload: res }),
    });
  }, [page, loading]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetchData();
  }, [discoverType, page]);

  const fetchData = async () => {
    try {
      if (page === -1) {
        return;
      }
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.DISCOVER_MOVIES_SERIES,
          type,
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
        <h1>Discover {type === "movie" ? "Movies" : "Tv Shows"}</h1>

        <div>
          <CardWrapper>
            {data.length > 0
              ? data.map((item, idx) => {
                  return (
                    <div
                      key={item.id}
                      ref={idx === data.length - 1 ? lastElementRef : null}
                    >
                      <DisplayCard item={item} listenerType={"movie"} />
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

export default Discover;
