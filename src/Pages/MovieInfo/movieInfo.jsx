/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "./style";

import { Box, CircularProgress } from "@mui/material";

import { dataProcessor } from "../../utils/dataProcessor";
import { APIInstance, getStatusAPI } from "../../api";
import HeaderInfo from "./HeaderInfo";
import BodyInfo from "./BodyInfo";
import { apiURLS } from "../../constants";
import { API_KEY } from "../../keys";

const MovieInfo = () => {
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();
  const [tvCrew, setTvCrew] = useState({});
  const [tvRatings, setTvRatings] = useState({});
  const [data, setData] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [headerData, setheaderData] = useState({});

  console.log("DATA: ->", type, id);

  useEffect(() => {
    setLoading(true);
    setheaderData({});
    const tvCrewApi = APIInstance.get(apiURLS.getTvCrewURL(id));
    const tvRatingAPi = APIInstance.get(apiURLS.getTvRatingsURL(id));
    const data = APIInstance.get(
      apiURLS.getSelectedMovieTvURL(type, id, API_KEY)
    );
    const watchProviders = APIInstance.get(
      apiURLS.getSelectedMovieTvWatchProvidersURL(type, id)
    );

    const pSettled = Promise.allSettled([
      tvCrewApi,
      tvRatingAPi,
      data,
      watchProviders,
    ]);

    pSettled.then((res) => {
      console.log("RESULT", res);
      setTvCrew(res[0]?.value?.data);
      setTvRatings(res[1]?.value?.data);
      setData(res[2]?.value?.data);
      setWatchProviders(res[3]?.value?.data?.results);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!loading) {
      console.log("LOADING", loading);
      setheaderData({});
      const res = dataProcessor(data, type, tvRatings, tvCrew);
      getStatusAPI(res, type, data.id, setheaderData);
    }
  }, [loading]);

  // console.log("HEADER DATA", headerData);

  return (
    <Container>
      {loading || Object.keys(headerData).length === 0 ? (
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
            data={data}
          />
          <BodyInfo data={data} type={type} tvCrew={tvCrew} />
        </>
      )}
    </Container>
  );
};

export default MovieInfo;
