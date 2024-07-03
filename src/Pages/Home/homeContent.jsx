/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";

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

const HomeContentPage = ({
  list,
  getUrl,
  queryPath,
  listenerType,
  processImages,
}) => {
  const [specials, setSpecials] = useState(
    queryPath[0].endPoint ? queryPath[0].endPoint : queryPath[0].path
  );
  const { handleNavigation } = useContentInfo();

  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  const handleChange = useCallback((event, newSpecials) => {
    event.preventDefault();
    if (newSpecials) {
      setSpecials(newSpecials);
    }
  }, []);

  const getDataAndBackDrops = useCallback(() => {
    const endPoint = queryPath[0].endPoint ? specials : undefined;
    const path = queryPath[0].endPoint ? queryPath[0].path : specials;
    const url = getUrl(path, endPoint);
    APIInstance.get(url)
      .then((res) => {
        processImages(res.data.results);
        setMovieData(res.data.results);
        setLoading(false);
      })
      .catch((err) => console.log("ERROR COLLECTING IMAGES:", err));
  }, [getUrl, processImages, queryPath, specials]);

  useEffect(() => {
    setLoading(true);

    getDataAndBackDrops();
  }, [specials, getUrl, queryPath]);

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
              <SpinnerWrapper>
                <CircularProgress />
              </SpinnerWrapper>
            ) : (
              movieData.map((item) => {
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
