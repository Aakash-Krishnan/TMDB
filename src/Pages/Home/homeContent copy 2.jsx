/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useCallback, useState } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {
  WholeDiv,
  DisplayCardContainer,
  GenreContainer,
  CardWrapper,
} from "./style";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { useDispatch, useSelector } from "react-redux";

import { getHomeDataAndBackDropsAPIByRedux } from "../../redux/feature/home/homeSlice";

const HomeContentPage = ({
  list,
  getUrl,
  queryPath,
  listenerType,
  processImages,
}) => {
  const specialsData = useSelector((state) => state.home);
  const [loading, setLoading] = useState(true);
  const { homeData } = specialsData;

  const [specials, setSpecials] = useState(
    (queryPath[0].endPoint !== "" ? queryPath[0].endPoint : queryPath[0].path) +
      "-" +
      listenerType
  );

  const reduxDispatch = useDispatch();

  useEffect(() => {
    if (specials !== "" && !homeData[specials]) {
      setLoading(true);
      reduxDispatch(
        getHomeDataAndBackDropsAPIByRedux({
          queryPath,
          getUrl,
          processImages,
          specials,
        })
      );
      setLoading(false);
    }
  }, [specials, getUrl, queryPath]);

  const handleChange = useCallback((event, newSpecials) => {
    event.preventDefault();
    if (newSpecials) {
      setSpecials(newSpecials + "-" + listenerType);
    }
  }, []);


  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h2>{list}</h2>
          <ToggleButtonGroup
            color="secondary"
            value={specials.split("-")[0]}
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
              homeData[specials] != null &&
              homeData[specials].map((item) => {
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
