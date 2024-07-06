/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";

import {
  CardWrapper,
  DisplayCardContainer,
  GenreContainer,
  WholeDiv,
} from "./style";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import {
  collectionsInitialState,
  collectionsReducer,
} from "../../reducers/collectionsReducer";
import { useParams } from "react-router-dom";
import { useCollections } from "../../api";

const MyCollectionsList = () => {
  const { listType } = useParams();

  const { getMyCollectionsAPI } = useCollections();

  const { lastElementRef, elementObserver } = useInfiniteLoad();

  const [state, dispatch] = useReducer(
    collectionsReducer,
    collectionsInitialState
  );
  const { data, view, loading, page } = state;

  useEffect(() => {
    dispatch({ type: "RESET", payload: "movies" });
  }, [listType]);

  useEffect(() => {
    elementObserver({
      loading,
      page,
      callBackFn: (res) => dispatch({ type: "SET_PAGE", payload: res }),
    });
  }, [page, loading]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    getMyCollectionsAPI({ page, view, listType, dispatch });
  }, [listType, view, page]);

  const handleChange = (event, newView) => {
    event.preventDefault();
    if (newView) {
      dispatch({ type: "RESET", payload: newView });
    }
  };

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h1>{listType === "favorite" ? "Favorite" : "Watch Lists"}</h1>

          <ToggleButtonGroup
            color="secondary"
            value={view}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={{ height: "40px" }}
          >
            <ToggleButton value="movies">Movies</ToggleButton>
            <ToggleButton value="tv">Tv Shows</ToggleButton>
          </ToggleButtonGroup>
        </GenreContainer>

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
                        listenerType={view === "movies" ? "movie" : "tv"}
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
    </WholeDiv>
  );
};

export default MyCollectionsList;
