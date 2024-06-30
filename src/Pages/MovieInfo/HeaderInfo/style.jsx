import styled from "styled-components";
import Card from "@mui/material/Card";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const HeaderContainer = styled.div`
  min-height: 600px;
  background-color: "black";
  background: "black";
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

  width: 90%;

  display: flex;
  gap: 40px;
  padding: 0px;
`;

export const FavIcon = styled(FavoriteIcon)`
  color: ${(props) => `${props.isfav === "true" ? "#ef47b6" : "white"}`};
`;

export const WatchlistIcon = styled(BookmarkIcon)`
  color: ${(props) => `${props.watchlist === "true" ? "#cf3131" : "white"}`};
`;
