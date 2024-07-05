/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  BackgroundImg,
  Content,
  FavIcon,
  HeaderContainer,
  WatchlistIcon,
  ModalStyle,
  ModalIframe,
} from "./style";

import { IMAGES_BASE_URL } from "../../../constants";

import {
  Box,
  CircularProgress,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { ArrowToolTip } from "../../../Components/Tooltip";
import { setStatusAPI } from "../../../api";
import { useState } from "react";
import { watchProviderProcessor } from "../../../utils/dataProcessor";

const HeaderInfo = ({
  headerData,
  type,
  setheaderData,
  watchProviders,
  data,
}) => {
  const [modal, setModal] = useState(false);

  const watchProvider = watchProviderProcessor(watchProviders);

  return (
    <HeaderContainer>
      <BackgroundImg imgurl={`${IMAGES_BASE_URL}${headerData.backdrop}`}>
        <Content>
          <div>
            <ImageListItem style={{ width: "300px" }}>
              <img src={`${IMAGES_BASE_URL}${headerData.poster}`} />
              {watchProvider && (
                <ImageListItemBar
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#0d253f",
                  }}
                  title={watchProvider.provider_name}
                  actionIcon={
                    <img
                      className="image-list-item-bar-img"
                      src={`${IMAGES_BASE_URL}${watchProvider.logo_path}`}
                      alt="PROVIDER"
                    />
                  }
                />
              )}
            </ImageListItem>
          </div>

          <div className="header-content-wrapper">
            <div className="title">
              <p>{headerData.title}</p>
              <p>({headerData.releaseYear})</p>
            </div>

            <div className="certification-wrapper">
              {headerData?.finalCertificate?.certificate && (
                <p>{headerData?.finalCertificate?.certificate}</p>
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
            <div className="score-wrapper">
              <Box className="rating-circle">
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
                <Box className="score">
                  <p>
                    {`${Math.round(headerData.score)} `}
                    <sup>%</sup>
                  </p>
                </Box>
              </Box>
              <p className="score-tag">User Score</p>

              {/* <div style={{ margin: "0 8%" }}>EMOJI</div> */}

              <div className="vibe-tag">
                <p>{`What's your vibe?`}</p>
              </div>
            </div>
            <div className="collection-wrapper">
              <ArrowToolTip title={"Add to list"}>
                <div className="playlist-icon">
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
                  className="favorite-icon"
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
                  <FavIcon isfav={String(headerData.favorite)} />
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
                  className="watchlist-icon"
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
                  <WatchlistIcon watchlist={String(headerData.watchlist)} />
                </div>
              </ArrowToolTip>
              <div
                className="play-icon"
                onClick={() => {
                  setModal(true);
                }}
              >
                <PlayArrowIcon />
                <p>Play Trailer</p>
              </div>
            </div>

            <div className="tagline">
              <i>{headerData.tagline}</i>
            </div>

            {headerData.overview !== "" && (
              <div className="overview">
                <h3>Overview</h3>
                <p>{headerData.overview}</p>
              </div>
            )}

            <div className="crew-job-wrapper">
              {headerData?.crewJob &&
                Object.entries(headerData?.crewJob).map(([key, value]) => (
                  <div className="items" key={key}>
                    <h4>{key}</h4>
                    <p>{value.join(", ")}</p>
                  </div>
                ))}
            </div>
          </div>
        </Content>
      </BackgroundImg>

      {modal && (
        <Modal
          open={modal}
          onClose={() => setModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalStyle}>
            <ModalIframe
              src={`https://www.youtube.com/embed/${data.videos.results[0]?.key}`}
              allowFullScreen
            ></ModalIframe>
          </Box>
        </Modal>
      )}
    </HeaderContainer>
  );
};

export default HeaderInfo;
