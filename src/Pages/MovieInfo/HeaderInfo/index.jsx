/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  BackgroundImg,
  Content,
  FavIcon,
  HeaderContainer,
  WatchlistIcon,
} from "./style";

import { IMAGES_BASE_URL } from "../../../constants";

import {
  Box,
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { ArrowToolTip } from "../../../Components/Tooltip";
import { setStatusAPI } from "../../../api";

const HeaderInfo = ({ headerData, type, setheaderData, watchProviders }) => {
  // console.log(watchProviders);
  const watchProvider =
    Object.keys(watchProviders).length > 0
      ? watchProviders.IN
        ? watchProviders.IN.flatrate[0]
        : watchProviders[Object.keys(watchProviders)[0]].buy[0]
      : null;
  // console.log("WATCH PROVIDER", watchProvider);
  return (
    <HeaderContainer>
      <BackgroundImg imgurl={`${IMAGES_BASE_URL}${headerData.backdrop}`}>
        <Content>
          <div>
            <ImageListItem style={{ width: "300px" }}>
              <img src={`${IMAGES_BASE_URL}${headerData.poster}`} />
              {watchProvider && (
                <ImageListItemBar
                  title={watchProvider.provider_name}
                  actionIcon={
                    <img
                      style={{ marginRight: "10px", marginTop: "10px" }}
                      width="40px"
                      height="40px"
                      src={`${IMAGES_BASE_URL}${watchProvider.logo_path}`}
                      alt="PROVIDER"
                    />
                  }
                />
              )}
            </ImageListItem>
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

            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              {headerData?.finalCertificate?.certificate && (
                <p
                  style={{
                    border: "2px solid white",
                    padding: "4px",
                  }}
                >
                  {headerData?.finalCertificate?.certificate}
                </p>
              )}
              {headerData?.releaseDate && <p>{headerData?.releaseDate}</p>}

              {headerData?.finalCertificate?.country && (
                <>
                  <p>({headerData?.finalCertificate?.country})</p>
                  <span>.</span>{" "}
                </>
              )}
              <p>{headerData?.genres?.join(", ")}</p>
              {headerData?.duration ? (
                <>
                  <span>.</span>
                  <p>{headerData?.duration}</p>
                </>
              ) : undefined}
            </div>
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
                  <p style={{ color: "white", fontSize: "18px" }}>
                    {`${Math.round(headerData.score)} `}
                    <sup style={{ padding: "0px", fontSize: "10px" }}>%</sup>
                  </p>
                </Box>
              </Box>
              <p style={{ width: "10px" }}>User Score</p>

              {/* <div style={{ margin: "0 8%" }}>EMOJI</div> */}

              <div
                style={{
                  backgroundColor: "#0d253f",
                  padding: "10px",
                  borderRadius: "20px",
                  margin: "0 8%",
                  cursor: "pointer",
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

              <ArrowToolTip
                title={
                  headerData.favorite === true
                    ? "Remove from favorite"
                    : "Mark as favorite"
                }
              >
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
                    setStatusAPI(
                      "favorite",
                      headerData.id,
                      headerData.favorite,
                      type,
                      setheaderData,
                      headerData
                    );
                  }}
                >
                  <FavIcon
                    isfav={String(headerData.favorite)}
                    style={{ fontSize: "20px" }}
                  />
                </div>
              </ArrowToolTip>

              <ArrowToolTip
                title={
                  headerData.watchlist === true
                    ? "Remove from watchlist"
                    : "Add to your watchlist"
                }
              >
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
                    setStatusAPI(
                      "watchlist",
                      headerData.id,
                      headerData.watchlist,
                      type,
                      setheaderData,
                      headerData
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
              <i>{headerData.tagline}</i>
            </div>

            {headerData.overview !== "" && (
              <div style={{ marginTop: "30px" }}>
                <h3 style={{ marginBottom: "4px" }}>Overview</h3>
                <p>{headerData.overview}</p>
              </div>
            )}
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
  );
};

export default HeaderInfo;
