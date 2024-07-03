/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURLS } from "../../../constants";
import { APIInstance, useContentInfo } from "../../../api";
import DisplayCard from "../../DisplayCard";

import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CardWrapper, Container, SpinnerWrapper } from "./style";

const SearchArea = () => {
  const { type, query } = useParams();
  const { handleNavigation } = useContentInfo();
  const lastElementRef = useRef(null);

  const [contentType, setContentType] = useState(type);

  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [view, setView] = useState(type);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, nextView) => {
    if (nextView) {
      setContentType(nextView);
      setLoading(true);
      setError(false);
      setPage(1);
      setSearchData([]);
      setView(nextView);
    }
  };

  useEffect(() => {
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
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const data = await APIInstance.get(
        apiURLS.getSearchURL(view, query, page)
      );
      const res = await data.data;

      setTotalResults(res.total_results);
      setSearchData((prev) => [...prev, ...res.results]);
      setLoading(false);

      if (res.results.length === 0 && searchData.length === 0) {
        throw new Error("No results found");
      }
    } catch (err) {
      console.log("SEARCH ERROR", err);
      setTotalResults(0);
      setError(true);
    }
  }, [view]);

  // NOTE: Need help
  useEffect(() => {
    fetchData();
  }, [view, page]);

  return (
    <Container>
      <div className="search-filter">
        <div className="search-view">
          <ToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <button className="search-view-button">Search Results</button>
            <ToggleButton value="movie" aria-label="movie">
              <p>Movies {view === "movie" && totalResults}</p>
            </ToggleButton>
            <ToggleButton value="tv" aria-label="tv">
              <p>Tv Shows {view === "tv" && totalResults}</p>
            </ToggleButton>
            <ToggleButton value="person" aria-label="person">
              <p>People {view === "person" && totalResults}</p>
            </ToggleButton>
            <ToggleButton value="collection" aria-label="collection">
              <p>Collections {view === "collection" && totalResults}</p>
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="card-display-area">
        {error ? (
          <h1>NO match</h1>
        ) : Object.keys(searchData).length === 0 ? (
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        ) : (
          <>
            <CardWrapper>
              {searchData.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard
                      item={item}
                      handleClick={handleNavigation}
                      listenerType={contentType}
                    />
                  </div>
                );
              })}
            </CardWrapper>

            {loading && (
              <SpinnerWrapper>
                <CircularProgress />
              </SpinnerWrapper>
            )}
          </>
        )}

        <div ref={lastElementRef}></div>
      </div>
    </Container>
  );
};

export default SearchArea;
