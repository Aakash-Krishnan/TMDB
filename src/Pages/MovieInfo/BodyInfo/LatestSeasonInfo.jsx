import { DividerWrapper, LatestSeasonDiv } from "./style";
import { Box, Card, CardContent, CardMedia, Divider } from "@mui/material";

import { IMAGES_BASE_URL } from "../../../constants";
import moment from "moment";

const LatestSeasonInfo = ({ data }) => {
  return (
    <>
      <LatestSeasonDiv>
        <h2>Latest Seasons</h2>
        <Card className="card">
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`${IMAGES_BASE_URL}${
              data.seasons[data.seasons.length - 1].poster_path
            }`}
            alt="lastest-season-poster"
          />
          <Box>
            <CardContent className="card-content">
              <h2>{data.seasons[data.seasons.length - 1].name}</h2>
              <div className="content-wrapper">
                <p className="title-rating">
                  <span style={{ fontSize: "20px" }}>&#9733;</span>
                  {data.seasons[data.seasons.length - 1].vote_average * 10}%
                </p>
                <p>
                  {moment(
                    data.seasons[data.seasons.length - 1].air_date
                  ).format("yyyy")}
                </p>
                <span style={{ fontSize: "30px" }}>&#8226;</span>
                <p>
                  {data.seasons[data.seasons.length - 1].episode_count} Episodes
                </p>
              </div>

              <p className="overview">
                <i>
                  Season {data.seasons[data.seasons.length - 1].season_number}{" "}
                  of {data.name} premiered on{" "}
                  {moment(
                    data.seasons[data.seasons.length - 1].air_date
                  ).format("MMMM DD yyyy")}
                </i>
              </p>
            </CardContent>
          </Box>
        </Card>
      </LatestSeasonDiv>

      <DividerWrapper>
        <Divider className="divider"></Divider>
      </DividerWrapper>
    </>
  );
};

export default LatestSeasonInfo;
