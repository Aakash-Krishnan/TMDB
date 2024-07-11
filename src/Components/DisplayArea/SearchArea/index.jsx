/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getApiUrls, searchViews, urlType } from "../../../constants";
import { APIInstance } from "../../../api";
import DisplayCard from "../../DisplayCard";

import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CardWrapper, Container, SpinnerWrapper } from "./style";

import useAuth from "../../../hooks/useAuth";

const SearchArea = () => {
  useAuth();

  const { type, query } = useParams();

  const lastElementRef = useRef(null);

  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [view, setView] = useState(type);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(searchData);

  useEffect(() => {}, []);

  const handleChange = (event, nextView) => {
    if (nextView) {
      setLoading(true);
      setError(false);
      setPage(1);
      setSearchData([]);
      setView(nextView);
    }
  };

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

  // NOTE: Need help
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [view, page]);

  const fetchData = async () => {
    try {
      if (page === -1) {
        return;
      }
      const data = await APIInstance.get(
        getApiUrls({ urlFor: urlType.SEARCH, type: view, query, page })
      );
      const res = await data.data;
      if (res.results.length === 0 && searchData.length === 0) {
        throw new Error("No results found");
      }
      if (res.results.length === 0) {
        setPage(-1);
        return;
      }
      setTotalResults(res.total_results);
      setSearchData((prev) => [...prev, ...res.results]);
    } catch (err) {
      setTotalResults(0);
      setPage(-1);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

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
            <div className="search-view-title">Search Results</div>
            {searchViews.map((item) => {
              return (
                <ToggleButton
                  key={item.view}
                  value={item.view}
                  aria-label={item.view}
                >
                  <p>
                    {item.title}{" "}
                    {!loading && view === item.view && totalResults}
                  </p>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="card-display-area">
        {error ? (
          <h1>No results found</h1>
        ) : searchData.length > 0 ? (
          <>
            <CardWrapper>
              {searchData.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard item={item} listenerType={view} />
                  </div>
                );
              })}
            </CardWrapper>
          </>
        ) : (
          !loading && <h1>No data found</h1>
        )}

        {loading && (
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        )}

        <div ref={lastElementRef}></div>
      </div>
    </Container>
  );
};

export default SearchArea;
