import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

//$ styles
import { MenuItem } from "@mui/material";
import Select from "@mui/material/Select";
import { BackgroundImg, Content } from "./style";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

//$ constants
import { IMAGES_BASE_URL } from "../../constants";

const SearchBox = () => {
  const navigate = useNavigate();

  const specialsData = useSelector((state) => state.home);
  const { backDropImages } = specialsData;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchType, setSearchType] = useState("movie");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backDropImages.length
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [backDropImages.length]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        const val = e.target.value.split(" ").join("-");
        navigate(`/search/${searchType}/${val}`);
      }
    },
    [searchType]
  );

  return (
    <BackgroundImg
      imgurl={`${IMAGES_BASE_URL}${backDropImages[currentImageIndex]}`}
      className="search-container"
    >
      <Content>
        <div className="search-title">
          <h1>Welcome</h1>
          <h2>
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
        <div className="search-select-wrapper">
          <Select
            className="search-select"
            value={searchType}
            onChange={(event) => setSearchType(event.target.value)}
            inputProps={{ "aria-label": "Type" }}
          >
            <MenuItem value="movie">Movie</MenuItem>
            <MenuItem value="tv">TV Show</MenuItem>
          </Select>

          <FormControl className="search-form" variant="outlined">
            <InputLabel
              className="search-input"
              htmlFor="outlined-adornment-search"
            >
              Search
            </InputLabel>
            <OutlinedInput
              className="search-label"
              id="outlined-adornment-search"
              type={"text"}
              onKeyDown={handleKeyDown}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon className="search-icon" />
                </InputAdornment>
              }
              label="search"
            />
          </FormControl>
        </div>
      </Content>
    </BackgroundImg>
  );
};

export default SearchBox;
