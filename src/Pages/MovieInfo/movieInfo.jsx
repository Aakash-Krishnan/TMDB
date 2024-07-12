import { useEffect, useReducer } from "react";
import { useParams } from "react-router";

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
import { getMovieInfoDataAPI, getStatusAPI } from "../../api";
import { dataProcessor } from "../../utils/dataProcessor";
import HeaderInfo from "./HeaderInfo";
import BodyInfo from "./BodyInfo";

const MovieInfo = () => {
  //* custom hook to check the user Authentication.
  useAuth();

  const { type, id } = useParams();

  const [
    { loading, tvCrew, tvRatings, data, watchProviders, headerData },
    dispatch,
  ] = useReducer(informationReducer, infoInitialState);

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
