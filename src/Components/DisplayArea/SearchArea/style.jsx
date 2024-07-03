import { Box } from "@mui/material";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 40px;

  .search-filter {
    flex: 0 0 25%;
    margin-left: 50px;

    .search-view {
      width: 100%;
      place-items: center;
      position: sticky;
      top: 90px;

      .search-view-title {
        padding: 20px;
        cursor: auto;
        text-align: center;
        background-color: #01b4e4;
        border: none;
        outline: none;
        color: white;
        font-size: 20px;
        border-radius: 10px 10px 0px 0px;
      }
    }
  }

  .card-display-area {
    flex: 1;
  }
`;

export const SpinnerWrapper = styled(Box)`
  display: flex;
  place-items: center;
  height: 600px;
  justify-content: center;
  margin: auto;
`;

export const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
