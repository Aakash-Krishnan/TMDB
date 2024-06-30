/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  BackgroundImg,
  Container,
  Content,
  FavIcon,
  HeaderContainer,
  ImgCard,
  WatchlistIcon,
} from "./style";

import CardMedia from "@mui/material/CardMedia";
import {
  Box,
  CardActionArea,
  CircularProgress,
  Typography,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { dataProcessor } from "../../utils/movieDataProcessor";
import { ArrowToolTip } from "../../Components/Tooltip";
import { APIInstance } from "../../api";

const MovieInfo = () => {
  const { state } = useLocation();
  const { tvCrew, tvRatings, data, type } = state;

  const [headerData, setheaderData] = useState({});

  useEffect(() => {
    const res = dataProcessor(data, type, tvRatings, tvCrew);
    getFavStatusAPI(res, type, data.id);
  }, []);

  const getFavStatusAPI = (result, type, id) => {
    APIInstance.get(`${type}/${id}/account_states`).then((res) => {
      result.favorite = res.data.favorite;
      result.watchlist = res.data.watchlist;
      setheaderData(result);
    });
  };

  const handleStatus = (statusFor, id, flag) => {
    const val = flag ? false : true;
    APIInstance.post(`account/21348978/${statusFor}`, {
      media_type: type,
      media_id: id,
      [statusFor]: val,
    }).then((res) => {
      if (res.data.success === true) {
        setheaderData({ ...headerData, [statusFor]: val });
      }
    });
  };

  // console.log(headerData);

  return (
    <Container>
      {headerData && (
        <HeaderContainer>
          <BackgroundImg
            imgurl={`https://image.tmdb.org/t/p/original/${headerData.backdrop}`}
          >
            <Content>
              <div>
                <ImgCard>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="450"
                      image={`https://image.tmdb.org/t/p/original/${headerData.poster}`}
                      alt="green iguana"
                    />
                  </CardActionArea>
                </ImgCard>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    fontSize: "30px",
                  }}
                >
                  <p style={{ fontWeight: "900" }}>{headerData.title}</p>
                  <p>({headerData.releaseYear})</p>
                </div>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <p
                    style={{
                      border: "2px solid white",
                      padding: "4px",
                      // borderRadius: "7px",
                    }}
                  >
                    {headerData?.finalCertificate?.certificate}
                  </p>
                  <p>{headerData?.releaseDate}</p>
                  <p>({headerData?.finalCertificate?.country})</p>
                  <span>.</span>
                  <p>{headerData?.genres?.join(", ")}</p>
                  {headerData?.duration ? (
                    <>
                      <span
                      // style={{ fontSize: "70px" }}
                      >
                        .
                      </span>
                      <p>{headerData?.duration}</p>
                    </>
                  ) : undefined}
                </div>
                {/* } */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "20px",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-flex",
                      color: "tomato",
                    }}
                  >
                    <CircularProgress
                      color={
                        Math.round(headerData.score) > 70
                          ? "success"
                          : Math.round(headerData.score) > 40
                          ? "warning"
                          : "inherit"
                      }
                      variant="determinate"
                      value={headerData.score}
                      size={50}
                      thickness={4}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: "absolute",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="caption"
                        component="div"
                        color="white"
                        fontSize={18}
                      >
                        {`${Math.round(headerData.score)} `}
                        <sup style={{ padding: "0px", fontSize: "10px" }}>
                          %
                        </sup>
                      </Typography>
                    </Box>
                  </Box>
                  <p style={{ width: "10px" }}>User Score</p>

                  <div style={{ margin: "0 8%" }}>EMOJI</div>

                  <div
                    style={{
                      backgroundColor: "#0d253f",
                      padding: "10px",
                      borderRadius: "20px",
                    }}
                  >
                    <p>{`What's your vibe?`}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    marginTop: "20px",
                    alignItems: "center",
                  }}
                >
                  <ArrowToolTip title={"Add to list"}>
                    <div
                      style={{
                        boxSizing: "content-box",
                        border: "1px solid #0d253f",
                        borderRadius: "50%",
                        backgroundColor: "#0d253f",
                        padding: "12px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <PlaylistAddIcon />
                    </div>
                  </ArrowToolTip>

                  <ArrowToolTip title={"Mark as favorite"}>
                    <div
                      style={{
                        boxSizing: "content-box",
                        border: "1px solid #0d253f",
                        borderRadius: "50%",
                        backgroundColor: "#0d253f",
                        padding: "12px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() => {
                        handleStatus(
                          "favorite",
                          headerData.id,
                          headerData.favorite
                        );
                      }}
                    >
                      <FavIcon
                        isfav={String(headerData.favorite)}
                        style={{ fontSize: "20px" }}
                      />
                    </div>
                  </ArrowToolTip>

                  <ArrowToolTip title={"Add to your watchlist"}>
                    <div
                      style={{
                        boxSizing: "content-box",
                        border: "1px solid #0d253f",
                        borderRadius: "50%",
                        backgroundColor: "#0d253f",
                        padding: "12px",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onClick={() =>
                        handleStatus(
                          "watchlist",
                          headerData.id,
                          headerData.watchlist
                        )
                      }
                    >
                      <WatchlistIcon
                        style={{ fontSize: "20px" }}
                        watchlist={String(headerData.watchlist)}
                      />
                    </div>
                  </ArrowToolTip>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <PlayArrowIcon style={{ fontSize: "30px" }} />
                    <p>Play Trailer</p>
                  </div>
                </div>
                <div style={{ marginTop: "40px", color: "white" }}>
                  {headerData.tagline}
                </div>
                <div style={{ marginTop: "30px" }}>
                  <h3 style={{ marginBottom: "4px" }}>
                    <i>Overview</i>
                  </h3>
                  <p>{headerData.overview}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10%",
                  }}
                >
                  {headerData?.crewJob &&
                    Object.entries(headerData?.crewJob).map(([key, value]) => (
                      <div key={key} style={{ marginTop: "20px" }}>
                        <h4 style={{ flexBasis: "100%" }}>{key}</h4>
                        <p>{value.join(", ")}</p>
                      </div>
                    ))}
                </div>
              </div>
            </Content>
          </BackgroundImg>
        </HeaderContainer>
      )}
    </Container>
  );
};

export default MovieInfo;
