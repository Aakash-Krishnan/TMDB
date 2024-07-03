/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Container } from "./style";

import { CircularProgress } from "@mui/material";

import { dataProcessor } from "../../utils/dataProcessor";
import { APIInstance, getStatusAPI } from "../../api";
import HeaderInfo from "./HeaderInfo";
import BodyInfo from "./BodyInfo";
import { getApiUrls, urlType } from "../../constants";
import { API_KEY } from "../../keys";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";

const MovieInfo = () => {
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();
  const [tvCrew, setTvCrew] = useState({});
  const [tvRatings, setTvRatings] = useState({});
  const [data, setData] = useState({});
  const [watchProviders, setWatchProviders] = useState({});
  const [headerData, setheaderData] = useState({});

  useEffect(() => {
    setLoading(true);
    setheaderData({});
    const tvCrewApi = APIInstance.get(
      getApiUrls({ urlFor: urlType.TV_CREW, id })
    );
    const tvRatingAPi = APIInstance.get(
      getApiUrls({ urlFor: urlType.TV_RATINGS, id })
    );
    const data = APIInstance.get(
      getApiUrls({ urlFor: urlType.SELECTED_MOVIE_TV, type, id, API_KEY })
    );
    const watchProviders = APIInstance.get(
      getApiUrls({ urlFor: urlType.SELECTED_MOVIE_TV_WATCHPROVIDERS, type, id })
    );

    fetchData({ tvCrewApi, tvRatingAPi, data, watchProviders });
  }, [id]);

  useEffect(() => {
    if (!loading) {
      setheaderData({});
      const res = dataProcessor(data, type, tvRatings, tvCrew);
      getStatusAPI(res, type, data.id, setheaderData);
    }
  }, [loading]);

  const fetchData = useCallback(
    async ({ tvCrewApi, tvRatingAPi, data, watchProviders }) => {
      const pSettled = Promise.allSettled([
        tvCrewApi,
        tvRatingAPi,
        data,
        watchProviders,
      ]);

      pSettled.then((res) => {
        setTvCrew(res[0]?.value?.data);
        setTvRatings(res[1]?.value?.data);
        setData(res[2]?.value?.data);
        setWatchProviders(res[3]?.value?.data?.results);
        setLoading(false);
      });
    },
    []
  );

  return (
    <Container>
      {loading || Object.keys(headerData).length === 0 ? (
        <SpinnerWrapper>
          <CircularProgress />
        </SpinnerWrapper>
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
