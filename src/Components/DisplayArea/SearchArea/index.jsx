import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiURLS } from "../../../constants";
import { APIInstance } from "../../../api";
import DisplayCard from "../../DisplayCard";

import { API_KEY } from "../../../keys";
import {
  Box,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { CardWrapper } from "./style";

const SearchArea = () => {
  const [page, setPage] = useState(0);
  const [view, setView] = useState("list");
  const [searchData, setSearchData] = useState({});
  const navigate = useNavigate();
  const { type, query } = useParams();

  const handleChange = (event, nextView) => {
    setView(nextView);
  };

  useEffect(() => {
    APIInstance.get(apiURLS.getSearchURL(type, query))
      .then((res) => {
        setPage(res.data.page);
        setSearchData(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (e, id, type) => {
    e.preventDefault();
    const tvCrewApi = APIInstance.get(apiURLS.getTvCrewURL(id));
    const tvRatingAPi = APIInstance.get(apiURLS.getTvRatingsURL(id));
    const data = APIInstance.get(
      apiURLS.getSelectedMovieTvURL(type, id, API_KEY)
    );

    const pSettled = Promise.allSettled([tvCrewApi, tvRatingAPi, data]);
    pSettled.then((res) => {
      let name = res[2]?.value?.data.title
        ? res[2]?.value?.data.title
        : res[2]?.value?.data.name;

      name = name.split(" ").join("-");
      navigate(`/movie/${id}-${name}`, {
        state: {
          tvCrew: res[0]?.value?.data,
          tvRatings: res[1]?.value?.data,
          data: res[2]?.value?.data,
          type,
        },
      });
    });
  };

  console.log(searchData);

  return (
    <div>
      <h1>SEARCH</h1>

      <div style={{ display: "flex" }}>
        <div style={{ flex: "0 0 25%" }}>
          <div
            style={{
              width: "100%",
              placeItems: "center",
              border: "1px solid red",
              position: "sticky",
              top: "90px",
            }}
          >
            <ToggleButtonGroup
              orientation="vertical"
              value={view}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="list" aria-label="list">
                <p>Movies</p>
              </ToggleButton>
              <ToggleButton value="module" aria-label="module">
                <p>Tv Shows</p>
              </ToggleButton>
              <ToggleButton value="quilt" aria-label="quilt">
                <p>People</p>
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
                      handleClick={handleClick}
                      listenerType={type}
                    />
                  </div>
                );
              })}
            </CardWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
