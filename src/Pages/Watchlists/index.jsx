import { useEffect, useState } from "react";
import { APIInstance, useContentInfo } from "../../api";
import { apiURLS } from "../../constants";
import {
  CardWrapper,
  DisplayCardContainer,
  GenreContainer,
  WholeDiv,
} from "./style";
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import DisplayCard from "../../Components/DisplayCard";

const Watchlists = () => {
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
    const fetchData = async () => {
      const res = await APIInstance(
        apiURLS.getWatchListsAndFavorites("watchlist", view)
      );

      setData(res.data.results);
      setLoading(false);
    };
    fetchData();
  }, [view]);

  console.log(data);
  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h1>Watchlists</h1>

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

export default Watchlists;
