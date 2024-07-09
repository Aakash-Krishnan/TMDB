/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { Container } from "./style";

import { CircularProgress } from "@mui/material";

import { dataProcessor } from "../../utils/dataProcessor";
import { getMovieInfoDataAPI, getStatusAPI } from "../../api";
import HeaderInfo from "./HeaderInfo";
import BodyInfo from "./BodyInfo";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import {
  infoInitialState,
  informationReducer,
} from "../../reducers/informationReducer";
import useAuth from "../../hooks/useAuth";

const MovieInfo = () => {
  useAuth();

  const { type, id } = useParams();

  const [state, dispatch] = useReducer(informationReducer, infoInitialState);
  const { loading, tvCrew, tvRatings, data, watchProviders, headerData } =
    state;

  useEffect(() => {
    dispatch({ type: "LOADING" });

    getMovieInfoDataAPI({
      id,
      type,
      dispatch,
    });
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
