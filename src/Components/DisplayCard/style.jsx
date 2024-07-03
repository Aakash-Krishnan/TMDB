import styled from "styled-components";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";

export const MoviesCard = styled(Card)`
  width: 180px;
  height: auto;
  margin: 14px 0px;
  border-radius: 16px !important;
`;

export const ProgressCircle = styled(Box)`
  position: absolute;
  display: inline-flex;
  top: 180px;
  left: 6px;
  color: black;

  .label {
    font-size: 14px;
    color: white;
  }
`;

export const ProgressLabel = styled(Box)`
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CardContentWrapper = styled.div`
  min-height: 70px;
  max-height: 80px;

  div {
    color: white;
    height: 32px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
  }

  .air-date {
    color: grey;
    margin-top: 5px;
  }
`;
