import styled from "styled-components";
import Card from "@mui/material/Card";

export const Container = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px 10%;

  .container-wrapper {
    width: 100%;
  }

  .full-cast {
    margin-top: 20px;
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
  }
`;

export const MoviesCard = styled(Card)`
  border-radius: 16px !important;
  width: 160px;
  height: auto;
  margin: 14px 0px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  .card-media {
    border-radius: 16px;
    height: 200px;
  }

  .card-content-wrapper {
    min-height: 70px;
    max-height: 80px;

    h3 {
      color: #0d253f;
      height: 32px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;

      :nth-child(2) {
        color: grey;
        margin-top: 5px;
      }
    }
  }
`;

export const ImagesCard = styled(Card)`
  min-width: 360px;
  margin: 10px 0px 0px 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

export const CardWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 20px;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    height: 12px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: grey;
  }
`;

export const LatestSeasonDiv = styled.div`
  .card {
    display: flex;
    width: 100%;
  }

  .card-content {
    .content-wrapper {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .title-rating {
      background-color: #0d253f;
      color: white;
      padding: 2px 8px;
      border-radius: 8px;
    }
  }
  .overview {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;
  }
`;
export const ReviewsWrapper = styled.div`
  margin-top: 20px;

  .reviews-container {
    margin-top: 20px;
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    margin-bottom: 50px;

    .review-card {
      margin: 10px 30px 20px 10px;
      box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
        rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

      .author-content {
        display: flex;
        width: 100%;

        gap: 10px;
        align-items: center;

        .author-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .author-alt-img {
          font-size: 28px;
          background-color: indigo;
          color: white;
          width: 40px;
          height: 40px;
          display: flex;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
        }

        .author-details {
          display: flex;
          flex-direction: column;

          .reviewer-title {
            font-size: 20px;
            font-weight: 600;

            .posted-details {
              font-size: 14px;
              font-weight: 400;
              color: grey;

              span {
                font-weight: 400;
                color: black;
              }
            }
          }
        }
      }
      .review-content {
        margin-top: 30px;
        font-size: 14px;
        .content {
          font-family: cursive;
        }
      }
    }
  }
`;

export const TrailersAndPosters = styled.div`
  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .card-wrapper {
    display: flex;
    overflow-x: auto;
    padding: 10px;

    .video-player {
      height: 240px;
      width: 480px;
    }
  }
`;

export const RecommendationsWrapper = styled.div``;

export const DividerWrapper = styled.div`
  margin: 20px 0px;

  .divider {
    height: 1.5px;
    background-color: grey;
  }
`;
