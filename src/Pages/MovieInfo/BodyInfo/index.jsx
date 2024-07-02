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
import { IMAGES_BASE_URL, apiURLS } from "../../../constants";
import { CardWrapper, ImagesCard, MoviesCard } from "./style";
import { useEffect, useState } from "react";

import { APIInstance, useContentInfo } from "../../../api/index";
import DisplayCard from "../../../Components/DisplayCard";

const BodyInfo = ({ type, data }) => {
  const { handleNavigation } = useContentInfo();

  const [view, setView] = useState("videos");
  const [images, setImages] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obj = {
      videos: data?.videos?.results,
      backdrops: data?.images?.backdrops,
      posters: data?.images?.posters,
      logos: data?.images?.logos,
    };
    setImages(obj);
    setLoading(true);
    const fetchRecommendations = async () => {
      try {
        const res = await APIInstance.get(
          apiURLS.getRecommendations(type, data.id)
        );
        setRecommendations(res.data.results);
        setLoading(false);
      } catch (err) {
        console.log("ERROR ON RECOMMENDATIONS", err);
      }
    };

    fetchRecommendations();
  }, []);

  // console.log(images);

  const handleChange = (event, newView) => {
    if (newView) {
      setView(newView);
    }
  };
  // console.log(data);
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
            <i>full cast & crew</i>
          </p>
        </div>
        <div style={{ margin: "20px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>

        {type === "tv" && (
          <>
            <div>
              <h2>Latest Seasons</h2>
              <Card sx={{ display: "flex", width: "100%" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={`${IMAGES_BASE_URL}${
                    data.seasons[data.seasons.length - 1].poster_path
                  }`}
                  alt="lastest-season-poster"
                />
                <Box>
                  <CardContent>
                    <h2>{data.seasons[data.seasons.length - 1].name}</h2>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <p
                        style={{
                          backgroundColor: "#0d253f",
                          color: "white",
                          padding: "2px 8px",
                          borderRadius: "8px",
                        }}
                      >
                        <span style={{ fontSize: "20px" }}>&#9733;</span>
                        {data.seasons[data.seasons.length - 1].vote_average *
                          10}
                        %
                      </p>
                      <p>
                        {moment(
                          data.seasons[data.seasons.length - 1].air_date
                        ).format("yyyy")}
                      </p>
                      <span style={{ fontSize: "30px" }}>&#8226;</span>
                      <p>
                        {data.seasons[data.seasons.length - 1].episode_count}{" "}
                        Episodes
                      </p>
                    </div>

                    <p
                      style={{
                        marginTop: "50px",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      <i>
                        Season{" "}
                        {data.seasons[data.seasons.length - 1].season_number} of{" "}
                        {data.name} premiered on{" "}
                        {moment(
                          data.seasons[data.seasons.length - 1].air_date
                        ).format("MMMM DD yyyy")}
                      </i>
                    </p>
                  </CardContent>
                </Box>
              </Card>
            </div>
            <div style={{ margin: "30px 0px" }}>
              <Divider
                style={{ height: "1.5px", backgroundColor: "grey" }}
              ></Divider>
            </div>
          </>
        )}

        {data.reviews.results.length > 0 && (
          <>
            <div className="Reviews" style={{ marginTop: "20px" }}>
              <h2>Social</h2> <span>Reviews</span>
              <div
                style={{
                  marginTop: "20px",
                  minHeight: "200px",
                  maxHeight: "400px",
                  overflowY: "auto",
                  marginBottom: "50px",
                }}
              >
                {data.reviews.results.map((people) => {
                  return (
                    <Card
                      key={people.id}
                      style={{
                        margin: "10px 30px 20px 10px",
                        boxShadow:
                          " rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                      }}
                    >
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
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div>
                                <p
                                  style={{
                                    fontSize: "22px",
                                    fontWeight: "600",
                                  }}
                                >
                                  A review by {people.author_details.username}
                                </p>
                                <p
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "400",
                                    color: "grey",
                                  }}
                                >
                                  written by{" "}
                                  <span
                                    style={{
                                      fontWeight: "400",
                                      color: "black",
                                    }}
                                  >
                                    {people.author}
                                  </span>{" "}
                                  on{" "}
                                  {moment(people.created_at).format(
                                    "MMMM DD yyyy"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "30px",
                              fontSize: "16px",
                            }}
                          >
                            <p>{people.content}</p>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </div>
              <p>
                <i>Read all reviews</i>
              </p>
              <div style={{ margin: "40px 0px" }}>
                <Divider
                  style={{ height: "1.5px", backgroundColor: "grey" }}
                ></Divider>
              </div>
            </div>
          </>
        )}

        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <h1>Media</h1>
            <ToggleButtonGroup
              color="primary"
              value={view}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton value="videos">Videos</ToggleButton>
              <ToggleButton value="backdrops">Backdrops</ToggleButton>
              <ToggleButton value="posters">posters</ToggleButton>
              <ToggleButton value="logos">Logos</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <CardWrapper
            style={{
              display: "flex",
              overflowX: "auto",
              padding: "10px",
            }}
          >
            {images[view]?.map((item) => {
              return view === "videos" ? (
                <div>
                  <iframe
                    height="240px"
                    width="480px"
                    allowFullScreen
                    src={`https://www.youtube.com/embed/${item.key}`}
                  />
                </div>
              ) : (
                <ImagesCard key={item.file_path}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      width="480"
                      image={`${IMAGES_BASE_URL}${item.file_path}`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </ImagesCard>
              );
            })}
          </CardWrapper>
        </div>

        <div style={{ margin: "40px 0px" }}>
          <Divider
            style={{ height: "1.5px", backgroundColor: "grey" }}
          ></Divider>
        </div>

        <div>
          <h2>Recommendations</h2>
          <div>
            <CardWrapper>
              {loading ? (
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
                recommendations.length > 0 &&
                recommendations?.map((item) => {
                  return (
                    <div key={item.id}>
                      <DisplayCard
                        item={item}
                        handleClick={handleNavigation}
                        listenerType={type}
                      />
                    </div>
                  );
                })
              )}
            </CardWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyInfo;
