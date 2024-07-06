/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useCallback, useReducer } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { getHomeDataAndBackDropsAPI } from "../../api";
import {
  WholeDiv,
  DisplayCardContainer,
  GenreContainer,
  CardWrapper,
} from "./style";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { homeInitialState, homeReducer } from "../../reducers/homeReducer";
import { useSelector } from "react-redux";

const HomeContentPage = ({
  list,
  getUrl,
  queryPath,
  listenerType,
  processImages,
}) => {
  const specialsData = useSelector((state) => state.home);
  console.log("REDUX SPECIALS", specialsData);
  // const dispatch = useDispatch();
  const [state, dispatch] = useReducer(homeReducer, homeInitialState);
  const { loading, data, specials } = state;

  useEffect(() => {
    dispatch({
      type: "SET_SPECIALS",
      payload: queryPath[0].endPoint
        ? queryPath[0].endPoint
        : queryPath[0].path,
    });
  }, [queryPath]);

  useEffect(() => {
    dispatch({ type: "LOADING" });
    getHomeDataAndBackDropsAPI({
      queryPath,
      dispatch,
      specials,
      getUrl,
      processImages,
    });
  }, [specials, getUrl, queryPath]);

  const handleChange = useCallback((event, newSpecials) => {
    event.preventDefault();
    if (newSpecials) {
      dispatch({ type: "SET_SPECIALS", payload: newSpecials });
    }
  }, []);

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h2>{list}</h2>
          <ToggleButtonGroup
            color="secondary"
            value={specials}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            style={{ height: "40px" }}
          >
            {queryPath.map((item) => {
              return (
                <ToggleButton
                  key={item.id}
                  value={item.endPoint ? item.endPoint : item.path}
                >
                  {item.title}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </GenreContainer>

        <div>
          <CardWrapper>
            {loading ? (
              <SpinnerWrapper style={{ height: "350px" }}>
                <CircularProgress />
              </SpinnerWrapper>
            ) : (
              data.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard item={item} listenerType={listenerType} />
                  </div>
                );
              })
            )}
          </CardWrapper>
        </div>
      </DisplayCardContainer>
    </WholeDiv>
  );
};

export default HomeContentPage;
