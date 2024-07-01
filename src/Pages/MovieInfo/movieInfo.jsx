/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container } from "./style";

import { Box, CircularProgress } from "@mui/material";

import { dataProcessor } from "../../utils/dataProcessor";
import { getStatusAPI } from "../../api";
import HeaderInfo from "./HeaderInfo";
import BodyInfo from "./BodyInfo";

const MovieInfo = () => {
  const { state } = useLocation();
  const { tvCrew, tvRatings, data, type, watchProviders } = state;

  const [headerData, setheaderData] = useState({});

  useEffect(() => {
    const res = dataProcessor(data, type, tvRatings, tvCrew);
    getStatusAPI(res, type, data.id, setheaderData);
  }, []);

  // console.log(headerData);
  return (
    <Container>
      {Object.keys(headerData).length === 0 ? (
        <Box
          sx={{
            display: "flex",
            placeItems: "center",
            height: "600px",
            justifyContent: "center",
            margin: "auto",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <HeaderInfo
            headerData={headerData}
            setheaderData={setheaderData}
            type={type}
            watchProviders={watchProviders}
          />
          <BodyInfo data={data} type={type} tvCrew={tvCrew} />
        </>
      )}
    </Container>
  );
};

export default MovieInfo;
