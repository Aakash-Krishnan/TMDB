/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useCallback, useReducer } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { APIInstance, useContentInfo } from "../../api";
import {
  WholeDiv,
  DisplayCardContainer,
  GenreContainer,
  CardWrapper,
} from "./style";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { homeInitialState, homeReducer } from "../../reducers/homeReducer";

const HomeContentPage = ({
  list,
  getUrl,
  queryPath,
  listenerType,
  processImages,
}) => {
  const [state, dispatch] = useReducer(homeReducer, homeInitialState);
  const { loading, data, specials } = state;

  const { handleNavigation } = useContentInfo();

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
    getDataAndBackDrops();
  }, [specials, getUrl, queryPath]);

  const getDataAndBackDrops = useCallback(async () => {
    try {
      const endPoint = queryPath[0].endPoint ? specials : undefined;
      const path = queryPath[0].endPoint ? queryPath[0].path : specials;
      const url = getUrl(path, endPoint);

      const res = await APIInstance.get(url);
      dispatch({ type: "SET_DATA", payload: res.data.results });
      processImages(res.data.results, specials);
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
      console.log("ERROR COLLECTING IMAGES:", err);
    }
  }, [getUrl, queryPath, specials]);

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
                    <DisplayCard
                      item={item}
                      handleClick={handleNavigation}
                      listenerType={listenerType}
                    />
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
