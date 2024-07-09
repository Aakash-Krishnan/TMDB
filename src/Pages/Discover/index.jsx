/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";

import { CardWrapper, DisplayCardContainer, WholeDiv } from "./style";
import { CircularProgress } from "@mui/material";
import { getDiscoversAPI } from "../../api";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";
import { useParams } from "react-router-dom";
import {
  collectionsInitialState,
  collectionsReducer,
} from "../../reducers/collectionsReducer";
import useAuth from "../../hooks/useAuth.js";

const Discover = () => {
  useAuth();
  const { discoverType } = useParams();
  const type = discoverType.split("-")[0];

  const [state, dispatch] = useReducer(
    collectionsReducer,
    collectionsInitialState
  );
  const { data, loading, page } = state;

  const { lastElementRef, elementObserver } = useInfiniteLoad();

  useEffect(() => {
    dispatch({ type: "RESET", action: type });
  }, [type]);

  // TODO: Fix the issue with the infinite scroll
  useEffect(() => {
    elementObserver({
      loading,
      page,
      callBackFn: (res) => {
        console.log("CALLBACK", res);
        dispatch({ type: "SET_PAGE", payload: res });
      },
    });
  }, [page, loading]);

  useEffect(() => {
    if (!loading) {
      dispatch({ type: "LOADING" });
      getDiscoversAPI({ type, page, dispatch });
    }
  }, [discoverType, page]);

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <h1>Discover {type === "movie" ? "Movies" : "Tv Shows"}</h1>

        <div>
          <CardWrapper>
            {data.length > 0
              ? data.map((item) => {
                  return (
                    <div key={item.id}>
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

      {
        <div
          style={{
            cursor: "pointer",
            padding: "10px",
            textAlign: "center",
            backgroundColor: "#0d253f",
            color: "white",
          }}
          ref={lastElementRef}
          onClick={() => dispatch({ type: "SET_PAGE", payload: page + 1 })}
        >
          Load more
        </div>
      }
    </WholeDiv>
  );
};

export default Discover;
