import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useReducer } from "react";

//$ custom hooks
import useAuth from "../../hooks/useAuth";
import { useCollections } from "../../hooks/useCollections";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";

//$ styles
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
import Chip from "@mui/material/Chip";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";

//$ reducers
import {
  collectionsInitialState,
  collectionsReducer,
} from "../../reducers/collectionsReducer";

//$ components
import DisplayCard from "../../Components/DisplayCard";

//NOTE:  This component is common for both Favorite and Watchlist collections.
const MyCollectionsList = () => {
  //* custom hook to check the user Authentication.
  useAuth();
  const { listType } = useParams();
  //* custom hook to get the user's collections.
  const { getMyCollectionsAPI } = useCollections();
  //* custom hook for infinite scrolling.
  const { lastElementRef, elementObserver } = useInfiniteLoad();

  const { userName } = useSelector((state) => state.user);

  //* state management
  const [{ data, view, loading, page }, dispatch] = useReducer(
    collectionsReducer,
    collectionsInitialState
  );

  //* To reset the state between the pages.
  useEffect(() => {
    dispatch({ type: "RESET", payload: "movies" });
  }, [listType]);

  //* TO handle the infinite scrolling.
  useEffect(() => {
    const cleanupObserver = elementObserver({
      loading,
      page,
      callBackFn: (res) => dispatch({ type: "SET_PAGE", payload: res }),
    });

    return () => {
      if (cleanupObserver) cleanupObserver();
    };
  }, [page, loading]);

  //* To get the user's collections.
  useEffect(() => {
    if (page !== -1) {
      dispatch({ type: "LOADING" });
      getMyCollectionsAPI({ page, view, listType, dispatch });
    }
  }, [listType, view, page, userName]);

  //* To handle the view change.
  const handleChange = useCallback((event, newView) => {
    event.preventDefault();
    if (newView) {
      dispatch({ type: "RESET", payload: newView });
    }
  }, []);

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
            {data.length > 0 &&
              data.map((item, idx) => {
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
              })}
          </CardWrapper>
        </div>
        {!userName ||
          (loading && (
            <SpinnerWrapper>
              <CircularProgress />
            </SpinnerWrapper>
          ))}
        {userName && !loading && data.length === 0 && (
          <h3 className="error-tag">
            <Chip
              style={{ fontSize: "20px" }}
              label={`You don't have any ${
                listType === "favorite" ? "favorite" : "watchlist"
              } collection at the moment`}
            />
          </h3>
        )}
      </DisplayCardContainer>
    </WholeDiv>
  );
};

export default MyCollectionsList;
