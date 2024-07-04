import styled from "styled-components";
import Card from "@mui/material/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const ModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "0px",
  border: "none",
  outline: "none",
  p: 4,
};

export const HeaderContainer = styled.div`
  min-height: 600px;
  background-color: "black";
  background: "black";
  position: relative;
`;

export const BackgroundImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  place-items: center;

  margin: 0 auto;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => `url(${props.imgurl})`};
    background-size: cover;
    opacity: 0.5;
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }
`;

export const ImgCard = styled(Card)`
  height: inherit;
  height: 450px;
  width: 300px;
`;

export const Content = styled.div`
  margin-top: 50px;
  position: relative;
  z-index: 3;
  color: #fff;
  padding: 20px;
  height: 100%;
  place-items: center;
  width: 90%;

  display: flex;
  gap: 40px;
  padding: 0px;

  .image-list-item-bar-img {
    margin: 10px 10px 0px 0px;
    width: 40px;
    height: 40px;
  }

  .header-content-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 30px;

      :first-child {
        font-weight: 900;
      }
    }

    .certification-wrapper {
      display: flex;
      gap: 8px;
      align-items: center;

      :first-child {
        border: 2px solid white;
        padding: 4px;
      }
    }

    .score-wrapper {
      display: flex;
      gap: 4px;
      align-items: center;
      margin-top: 20px;

      .rating-circle {
        position: relative;
        display: inline-flex;
        color: tomato;

        .score {
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;

          :first-child {
            font-size: 18px;
            color: white;

            sup {
              padding: 0px;
              font-size: 10px;
            }
          }
        }
      }
      .score-tag {
        width: 10px;
      }

      .vibe-tag {
        background-color: #0d253f;
        padding: 10px;
        border-radius: 20px;
        margin: 0 8%;
        cursor: pointer;
      }
    }
    .collection-wrapper {
      display: flex;
      gap: 16px;
      margin-top: 20px;
      align-items: center;

      .playlist-icon {
        box-sizing: content-box;
        border: 1px solid #0d253f;
        border-radius: 50%;
        background-color: #0d253f;
        padding: 12px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .favorite-icon {
        box-sizing: content-box;
        border: 1px solid #0d253f;
        border-radius: 50%;
        background-color: #0d253f;
        padding: 12px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        :first-child {
          font-size: 20px;
        }
      }

      .watchlist-icon {
        box-sizing: content-box;
        border: 1px solid #0d253f;
        border-radius: 50%;
        background-color: #0d253f;
        padding: 12px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        :first-child {
          font-size: 20px;
        }
      }

      .play-icon {
        display: flex;
        align-items: center;
        cursor: pointer;

        :first-child {
          font-size: 30px;
        }
      }
    }

    .tagline {
      margin-top: 40px;
      color: white;
    }

    .overview {
      margin-top: 30px;

      :first-child {
        margin-bottom: 4px;
      }
    }

    .crew-job-wrapper {
      display: flex;
      flex-wrap: wrap;
      gap: 10%;

      .items {
        margin-top: 20px;

        :first-child {
          flex-basis: 100%;
        }
      }
    }
  }
`;

export const ModalIframe = styled.iframe`
  width: 850px;
  height: 450px;
`;

export const FavIcon = styled(FavoriteIcon)`
  color: ${(props) => `${props.isfav === "true" ? "#ef47b6" : "white"}`};
`;

export const WatchlistIcon = styled(BookmarkIcon)`
  color: ${(props) => `${props.watchlist === "true" ? "#cf3131" : "white"}`};
`;
