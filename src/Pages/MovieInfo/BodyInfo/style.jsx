import styled from "styled-components";
import { CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";

export const MoviesCard = styled(Card)`
  min-width: 160px;
  height: auto;
  margin: 14px 0px;
`;

export const WholeDiv = styled.div`
  display: flex;
  width: 90%;
  margin: auto;
  flex-direction: column;
`;

export const DisplayCardContainer = styled.div`
  overflow: hidden;
`;

export const GenreContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
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

export const CardActionAreaDiv = styled(CardActionArea)`
  background-color: "#0d253f";
`;
