import { useCallback, useEffect, useState } from "react";
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

const Favorites = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("movies");
  const [loading, setLoading] = useState(true);
  const { handleNavigation } = useContentInfo();

  const handleChange = (event, newView) => {
    event.preventDefault();
    if (newView) {
      setView(newView);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [view]);

  const fetchData = useCallback(async () => {
    const res = await APIInstance(
      getApiUrls({
        urlFor: urlType.WATCHLISTS_FAVORITES,
        getFor: "favorite",
        type: view,
      })
    );

    setData(res.data.results);
    setLoading(false);
  }, [view]);

  // console.log(data);
  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h1>Favorites</h1>
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
            {loading ? (
              <SpinnerWrapper>
                <CircularProgress />
              </SpinnerWrapper>
            ) : (
              data.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard
                      item={item}
                      handleClick={handleNavigation}
                      listenerType={view === "movies" ? "movie" : "tv"}
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

export default Favorites;
