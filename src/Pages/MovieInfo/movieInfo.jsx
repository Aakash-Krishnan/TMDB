import { useParams } from "react-router";
import { useEffect, useReducer } from "react";

//$ custom hooks
import useAuth from "../../hooks/useAuth";

//$ styles
import { Container } from "./style";
import { CircularProgress } from "@mui/material";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";

//$ reducers
import {
  infoInitialState,
  informationReducer,
} from "../../reducers/informationReducer";

//$ constants & components
import BodyInfo from "./BodyInfo";
import HeaderInfo from "./HeaderInfo";
import { ACTION_TYPES } from "../../constants";
import { dataProcessor } from "../../utils/dataProcessor";
import { getMovieInfoDataAPI, getStatusAPI } from "../../api";

const MovieInfo = () => {
  //* custom hook to check the user Authentication.
  useAuth();

  const { type, id } = useParams();

  const [
    { loading, tvCrew, tvRatings, data, watchProviders, headerData },
    dispatch,
  ] = useReducer(informationReducer, infoInitialState);

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.LOADING });

    getMovieInfoDataAPI({
      id,
      type,
      dispatch,
    });
  }, [id]);

  useEffect(() => {
    if (!loading) {
      dispatch({ type: ACTION_TYPES.RESET_HEADER });
      const res = dataProcessor(data, type, tvRatings, tvCrew);
      getStatusAPI(res, type, data.id, (result) =>
        dispatch({ type: ACTION_TYPES.SET_HEADER, payload: result })
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
              dispatch({ type: ACTION_TYPES.SET_HEADER, payload: res })
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
