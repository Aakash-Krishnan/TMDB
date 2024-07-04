/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer, useRef } from "react";
import { APIInstance, useContentInfo } from "../../api";
import { getApiUrls, urlType } from "../../constants";

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
import { favWLReducer, favWlInitialState } from "../../reducers/favWLReducer";

const Favorites = () => {
  const [state, dispatch] = useReducer(favWLReducer, favWlInitialState);

  const { handleNavigation } = useContentInfo();

  const lastElementRef = useRef(null);

  useEffect(() => {
    dispatch({ type: "RESET" });
  }, []);

  useEffect(() => {
    if (state.loading || state.page === -1) return;
    const observer = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el && el.isIntersecting) {
        dispatch({ type: "SET_PAGE", payload: state.page + 1 });
      }
    });

    if (lastElementRef.current) observer.observe(lastElementRef.current);

    return () => {
      if (lastElementRef.current) observer.disconnect(lastElementRef.current);
    };
  }, [state.page, state.loading]);

  useEffect(() => {
    dispatch({ type: "LOADING" });

    fetchData();
  }, [state.view, state.page]);

  const fetchData = async () => {
    try {
      if (state.page === -1) {
        return;
      }
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.WATCHLISTS_FAVORITES,
          getFor: "favorite",
          type: state.view,
          page: state.page,
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
      dispatch({ type: "SET_VIEW", payload: newView });
    }
  };

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h1>Favorites</h1>

          <ToggleButtonGroup
            color="secondary"
            value={state.view}
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
            {state.data.length > 0
              ? state.data.map((item, idx) => {
                  return (
                    <div
                      key={item.id}
                      ref={
                        idx === state.data.length - 1 ? lastElementRef : null
                      }
                    >
                      <DisplayCard
                        item={item}
                        handleClick={handleNavigation}
                        listenerType={state.view === "movies" ? "movie" : "tv"}
                      />
                    </div>
                  );
                })
              : !state.loading && (
                  <h1 style={{ marginTop: "20px" }}>No data found</h1>
                )}
          </CardWrapper>
        </div>
        {state.loading && (
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        )}
      </DisplayCardContainer>

      {/* {<div ref={lastElementRef}></div>} */}
    </WholeDiv>
  );
};

export default Favorites;
