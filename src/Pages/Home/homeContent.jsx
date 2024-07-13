import { useDispatch, useSelector } from "react-redux";
import { useEffect, useCallback, useState } from "react";

//$ styles
import {
  WholeDiv,
  DisplayCardContainer,
  GenreContainer,
  CardWrapper,
} from "./style";
import { Chip } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import CircularProgress from "@mui/material/CircularProgress";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";

//$ Reducers
import {
  setHomeData,
  getHomeDataAndBackDropsAPI,
} from "../../redux/feature/home/homeSlice";

//$ components
import DisplayCard from "../../Components/DisplayCard";

const HomeContentPage = ({ list, getUrl, queryPath, listenerType }) => {
  const dispatch = useDispatch();
  const { homeData } = useSelector((state) => state.home);

  //* Each toggle button is a specials.
  const [specials, setSpecials] = useState(
    `${
      queryPath[0].endPoint !== "" ? queryPath[0].endPoint : queryPath[0].path
    }-${listenerType}`
  );

  //* The homeData won't be having the data for the specials immediately. So until it fetches the data we are keeping empty.
  const { loading, data, error } = homeData[specials] || {
    loading: true,
    data: [],
    error: null,
  };

  useEffect(() => {
    if (!homeData[specials]) {
      dispatch(setHomeData(specials));
    }
  }, [specials]);

  useEffect(() => {
    if (specials !== "" && data.length === 0) {
      dispatch(
        getHomeDataAndBackDropsAPI({
          queryPath,
          getUrl,
          specials,
        })
      );
    }
  }, [specials, getUrl, queryPath]);

  const handleChange = useCallback((event, newSpecials) => {
    event.preventDefault();
    if (newSpecials) {
      setSpecials(`${newSpecials}-${listenerType}`);
    }
  }, []);

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <GenreContainer>
          <h2>{list}</h2>
          <ToggleButtonGroup
            color="secondary"
            value={specials.split("-")[0]}
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
              <SpinnerWrapper style={{ height: "350px" }}>
                <CircularProgress />
              </SpinnerWrapper>
            ) : error || data.length === 0 ? (
              <Chip
                style={{
                  fontSize: "20px",
                  margin: "50px auto",
                }}
                label={`Can't fetch the data at the moment`}
              />
            ) : (
              data.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard item={item} listenerType={listenerType} />
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
