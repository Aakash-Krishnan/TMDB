/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiURLS } from "../../../constants";
import { APIInstance, useContentInfo } from "../../../api";
import DisplayCard from "../../DisplayCard";

import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CardWrapper } from "./style";

const SearchArea = () => {
  const { type, query } = useParams();
  const { handleNavigation } = useContentInfo();
  const lastElementRef = useRef(null);

  const [contentType, setContentType] = useState(type);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [view, setView] = useState(type);
  const [searchData, setSearchData] = useState([]);

  const handleChange = (event, nextView) => {
    setContentType(nextView);
    setPage(1);
    setSearchData([]);
    setView(nextView);
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

  useEffect(() => {
    APIInstance.get(apiURLS.getSearchURL(view, query, page))
      .then((res) => {
        setTotalResults(res.data.total_results);
        setSearchData((prev) => [...prev, ...res.data.results]);
      })
      .catch((err) => console.log(err));
  }, [view, page]);

  // console.log(searchData);

  return (
    <div>
      <h1>SEARCH</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={{ flex: "0 0 25%" }}>
          <div
            style={{
              width: "100%",
              placeItems: "center",
              position: "sticky",
              top: "90px",
            }}
          >
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
              style={{ width: "100%" }}
            >
              <ToggleButton value="movie" aria-label="movie">
                <p>Movies {view === "movie" && totalResults}</p>
              </ToggleButton>
              <ToggleButton value="tv" aria-label="tv">
                <p>Tv Shows {view === "tv" && totalResults}</p>
              </ToggleButton>
              <ToggleButton value="person" aria-label="person">
                <p>People {view === "person" && totalResults}</p>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          {Object.keys(searchData).length === 0 ? (
            <Box
              sx={{
                display: "flex",
                placeItems: "center",
                height: "600px",
                justifyContent: "center",
                margin: "auto",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
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
          )}
          <div ref={lastElementRef}></div>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
