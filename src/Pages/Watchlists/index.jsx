import { useEffect, useRef, useState } from "react";
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

const Watchlists = () => {
  const [data, setData] = useState([]);
  const [view, setView] = useState("movies");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const { handleNavigation } = useContentInfo();

  const lastElementRef = useRef(null);

  useEffect(() => {
    if (loading || page === -1) return;
    const observer = new IntersectionObserver((entries) => {
      const el = entries[0];
      if (el && el.isIntersecting) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastElementRef.current) observer.observe(lastElementRef.current);

    return () => {
      if (lastElementRef.current) observer.disconnect(lastElementRef.current);
    };
  }, [page, loading]);

  // console.log(page);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [view, page]);

  const fetchData = async () => {
    if (page === -1) {
      setLoading(false);
      return;
    }
    const res = await APIInstance(
      getApiUrls({
        urlFor: urlType.WATCHLISTS_FAVORITES,
        getFor: "watchlist",
        type: view,
        page,
      })
    );
    if (res.data.results.length === 0) {
      setLoading(false);
      setPage(-1);
      return;
    }
    setData((prev) => [...prev, ...res.data.results]);
    setLoading(false);
  };

  const handleChange = (event, newView) => {
    event.preventDefault();
    if (newView) {
      setData([]);
      setPage(1);
      setView(newView);
    }
  };

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

      {/* {<div ref={lastElementRef}></div>} */}
    </WholeDiv>
  );
};

export default Watchlists;
