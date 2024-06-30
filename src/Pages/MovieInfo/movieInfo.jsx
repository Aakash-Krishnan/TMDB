/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Container } from "./style";

import { CircularProgress } from "@mui/material";

import { dataProcessor } from "../../utils/dataProcessor";
import { getStatusAPI } from "../../api";
import HeaderInfo from "./HeaderInfo";

const MovieInfo = () => {
  const { state } = useLocation();
  const { tvCrew, tvRatings, data, type } = state;

  const [headerData, setheaderData] = useState({});

  useEffect(() => {
    const res = dataProcessor(data, type, tvRatings, tvCrew);
    getStatusAPI(res, type, data.id, setheaderData);
  }, []);

  return (
    <Container>
      {Object.keys(headerData).length === 0 ? (
        <CircularProgress color="secondary" />
      ) : (
        <HeaderInfo
          headerData={headerData}
          setheaderData={setheaderData}
          type={type}
        />
      )}
    </Container>
  );
};

export default MovieInfo;
