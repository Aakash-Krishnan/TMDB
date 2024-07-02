import styled from "styled-components";
import { CardActionArea } from "@mui/material";

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
  flex-wrap: wrap;
  gap: 20px;
`;

export const CardActionAreaDiv = styled(CardActionArea)`
  background-color: "#0d253f";
`;
