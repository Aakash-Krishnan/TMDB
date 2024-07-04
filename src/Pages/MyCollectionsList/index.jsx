/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import { APIInstance, useContentInfo } from "../../api";
import { getApiUrls, urlType } from "../../constants";
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

const MyCollectionsList = () => {
  const { listType } = useParams();

  const { handleNavigation } = useContentInfo();
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
    elementObserver({ loading, page, dispatch });
  }, [page, loading]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    fetchData();
  }, [listType, view, page]);

  const fetchData = async () => {
    try {
      if (page === -1) {
        return;
      }
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.WATCHLISTS_FAVORITES,
          getFor: listType,
          type: view,
          page: page,
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
                        handleClick={handleNavigation}
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
