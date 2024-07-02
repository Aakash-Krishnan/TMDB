/* eslint-disable react/prop-types */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import moment from "moment";
import { IMAGES_BASE_URL } from "../../../constants";
import { CardWrapper, MoviesCard } from "./style";
import { useState } from "react";

const BodyInfo = ({ tvCrew, type, data }) => {
  const [view, setView] = useState("videos");
  const [images, setImages] = useState([]);

  const handleChange = (event, newView) => {
    
    setView(newView);
  };
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

        <div style={{ margin: "40px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>

        <div className="Reviews">
          <h2>Social</h2> <span>Reviews</span>
          <div
            style={{
              marginTop: "20px",
              minHeight: "200px",
              maxHeight: "400px",
              // border: "1px solid red",
              overflowY: "auto",
              marginBottom: "50px",
            }}
          >
            {data.reviews.results.map((people) => {
              return (
                <Card key={people.id} style={{ margin: "30px 30px 30px 0px" }}>
                  <CardActionArea>
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        {people.author_details.avatar_path ? (
                          <img
                            width="60px"
                            height="60px"
                            style={{ borderRadius: "50%" }}
                            src={`${IMAGES_BASE_URL}${people.author_details.avatar_path}`}
                            alt="profile-pik"
                          />
                        ) : (
                          <div
                            style={{
                              fontSize: "28px",
                              backgroundColor: "indigo",
                              color: "white",
                              width: "50px",
                              height: "50px",
                              display: "flex",
                              borderRadius: "50%",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {people.author[0]}
                          </div>
                        )}
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <div>
                            <p style={{ fontSize: "24px", fontWeight: "600" }}>
                              A review by {people.author_details.username}
                            </p>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "400",
                              }}
                            >
                              written by {people.author} on{" "}
                              {moment(people.created_at).format("MMMM DD yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "30px",
                          fontSize: "18px",
                        }}
                      >
                        <p>{people.content}</p>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
            <p>Read all reviews</p>
          </div>
        </div>

        <div style={{ margin: "40px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>

        <div>
          <div>
            <h1>Media</h1>
            <ToggleButtonGroup
              color="primary"
              value={view}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="web">Web</ToggleButton>
              <ToggleButton value="android">Android</ToggleButton>
              <ToggleButton value="ios">iOS</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div style={{ margin: "40px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>

        <div>Recommendations</div>
      </div>
    </div>
  );
};

export default BodyInfo;
