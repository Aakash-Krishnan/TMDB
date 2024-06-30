/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { API_KEY } from "../../keys";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { APIInstance } from "../../api";
import {
  WholeDiv,
  DisplayCardContainer,
  GenreContainer,
  CardWrapper,
} from "./style";
import DisplayCard from "../../Components/DisplayCard";
import { apiURLS } from "../../constants";

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

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [movieData, setMovieData] = useState([]);

  const handleChange = (event, newSpecials) => {
    event.preventDefault();
    if (newSpecials) {
      setSpecials(newSpecials);
    }
  };

  useEffect(() => {
    setLoading(true);

    const endPoint = queryPath[0].endPoint ? specials : undefined;
    const path = queryPath[0].endPoint ? queryPath[0].path : specials;
    const url = getUrl(path, endPoint);
    APIInstance.get(url).then((res) => {
      processImages(res.data.results);
      setMovieData(res.data.results);
      setLoading(false);
    });
  }, [specials, getUrl, queryPath]);

  const handleClick = (e, id, type) => {
    e.preventDefault();
    const tvCrewApi = APIInstance.get(apiURLS.getTvCrewURL(id));
    const tvRatingAPi = APIInstance.get(apiURLS.getTvRatingsURL(id));
    const data = APIInstance.get(
      apiURLS.getSelectedMovieTvURL(type, id, API_KEY)
    );

    const pSettled = Promise.allSettled([tvCrewApi, tvRatingAPi, data]);
    pSettled.then((res) => {
      navigate(`/movie/${id}`, {
        state: {
          tvCrew: res[0]?.value?.data,
          tvRatings: res[1]?.value?.data,
          data: res[2]?.value?.data,
          type,
        },
      });
    });
  };

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h2>{list}</h2>
          <ToggleButtonGroup
            color="primary"
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
              <Box
                sx={{
                  display: "flex",
                  placeItems: "center",
                  height: "350px",
                  margin: "auto",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              movieData.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard
                      item={item}
                      handleClick={handleClick}
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
