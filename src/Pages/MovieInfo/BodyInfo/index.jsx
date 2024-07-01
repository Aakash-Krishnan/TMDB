/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
} from "@mui/material";

import { IMAGES_BASE_URL } from "../../../constants";
import { CardWrapper, MoviesCard } from "./style";

const BodyInfo = ({ tvCrew, type, data }) => {
  console.log(data);
  return (
    <div style={{ width: "100%", marginTop: "20px", padding: "10px 50px" }}>
      <div style={{ width: "75%" }}>
        <h1>Top Billed Cast</h1>
        <div>
          <CardWrapper>
            {data == null ? (
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
              data.credits.cast.map((item) => {
                return (
                  <div key={item.id}>
                    <div>
                      <MoviesCard
                        style={{ borderRadius: "16px" }}
                        key={item.id}
                      >
                        <CardActionArea>
                          <CardMedia
                            style={{ borderRadius: "16px" }}
                            component="img"
                            height="200"
                            image={`${IMAGES_BASE_URL}${item.profile_path}`}
                            alt="green iguana"
                          />

                          <CardContent stye={{ paddingBottom: "0px" }}>
                            <div
                              style={{
                                minHeight: "70px",
                                maxHeight: "80px",
                              }}
                            >
                              <h3
                                style={{
                                  color: "#0d253f",
                                  height: "32px",
                                  marginTop: "10px",
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <span>
                                  {item.original_title ?? item.original_name}
                                </span>
                                <span
                                  style={{ color: "grey", marginTop: "5px" }}
                                >
                                  {item.character}
                                </span>
                              </h3>
                            </div>
                          </CardContent>
                        </CardActionArea>
                      </MoviesCard>
                    </div>
                  </div>
                );
              })
            )}
          </CardWrapper>
          <p
            style={{
              marginTop: "20px",
              fontWeight: "400",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            full cast & crew
          </p>
        </div>
        <div style={{ margin: "20px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>
        {type === "tv" && (
          <div>
            <h2>Lastest Seasons</h2>
            <Card sx={{ display: "flex", width: "100%" }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={`${IMAGES_BASE_URL}${
                  data.seasons[data.seasons.length - 1].poster_path
                }`}
                alt="lastest-season-poster"
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 20,
                  pb: 1,
                  justifyContent: "center",
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <p>{data.seasons[data.seasons.length - 1].name}</p>
                  <p>
                    Air date: {data.seasons[data.seasons.length - 1].air_date}
                  </p>
                  <p>
                    Episode count:{" "}
                    {data.seasons[data.seasons.length - 1].episode_count}
                  </p>
                  <p>
                    Rating: {data.seasons[data.seasons.length - 1].vote_average}
                  </p>
                </CardContent>
              </Box>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyInfo;
