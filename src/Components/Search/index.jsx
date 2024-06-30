/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import "./style.css";

import { IMAGES_BASE_URL, apiURLS } from "../../constants";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import { APIInstance } from "../../api";
import { useDebounce } from "../../hooks/useDebounce";
import { BackgroundImg, Content } from "./style";

const SearchBox = ({ getSearchData, images }) => {
  const [search, setSearch] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const debounceHandler = useDebounce((value) => {
    const searchURL = apiURLS.getSearchURL(value);
    APIInstance.get(searchURL)
      .then((res) => getSearchData(res.data.results))
      .catch((err) => console.log(err));
  });

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    debounceHandler(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <BackgroundImg
      imgurl={`${IMAGES_BASE_URL}${images[currentImageIndex]}`}
      className="search-container"
    >
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          margin: "auto",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1>Welcome</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
        <FormControl
          className="search-form"
          variant="outlined"
          style={{ width: "100%", borderRadius: "20px", color: "red" }}
        >
          <InputLabel
            className="search-input"
            htmlFor="outlined-adornment-search"
            style={{
              color: "white",
            }}
          >
            Search
          </InputLabel>
          <OutlinedInput
            style={{
              border: "2px solid white",
              color: "white",
              fontWeight: 800,
              letterSpacing: "1px",
              fontSize: "20px",
              borderRadius: "80xp ",
              outline: "none",
            }}
            value={search}
            id="outlined-adornment-search"
            type={"text"}
            onChange={handleSearch}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon
                  style={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              </InputAdornment>
            }
            label="search"
          />
        </FormControl>
      </Content>
    </BackgroundImg>
  );
};

export default SearchBox;
