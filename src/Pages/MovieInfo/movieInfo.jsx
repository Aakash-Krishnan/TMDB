/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useReducer } from "react";
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
import {
  infoInitialState,
  informationReducer,
} from "../../reducers/informationReducer";

const MovieInfo = () => {
  const { type, id } = useParams();

  const [state, dispatch] = useReducer(informationReducer, infoInitialState);
  const { loading, tvCrew, tvRatings, data, watchProviders, headerData } =
    state;

  useEffect(() => {
    dispatch({ type: "LOADING" });

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
      dispatch({ type: "RESET_HEADER" });
      const res = dataProcessor(data, type, tvRatings, tvCrew);
      getStatusAPI(res, type, data.id, (result) =>
        dispatch({ type: "SET_HEADER", payload: result })
      );
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
        dispatch({ type: "SET_DATA", payload: res });
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
            setheaderData={(res) =>
              dispatch({ type: "SET_HEADER", payload: res })
            }
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
