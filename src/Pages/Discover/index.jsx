import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//$ custom hooks
import useAuth from "../../hooks/useAuth.js";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";

//$ styles
import { CardWrapper, DisplayCardContainer, WholeDiv } from "./style";
import { CircularProgress } from "@mui/material";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";

//$ reducers
import {
  getDiscoversAPI,
  reset,
  setLoading,
  setPage,
} from "../../redux/feature/Discover/discoverSlice.js";

//$ components
import DisplayCard from "../../Components/DisplayCard";

const Discover = () => {
  //* custom hook for user authentication.
  useAuth();

  const dispatch = useDispatch();
  const { discoverType } = useParams();
  //* custom hook for infinite scrolling.
  const { lastElementRef, elementObserver } = useInfiniteLoad();

  const type = discoverType.split("-")[0]; //! type = { movie or tv }

  const discoverData = useSelector((state) => state.discover);
  const { data, loading, page, view } = discoverData;

  //* To reset the state when ever the type changes.
  useEffect(() => {
    dispatch(reset(type));
  }, [type]);

  //* To handle the infinite scrolling.
  useEffect(() => {
    const cleanupObserver = elementObserver({
      loading,
      page,
      callBackFn: (res) => dispatch(setPage(res)),
    });

    return () => {
      if (cleanupObserver) cleanupObserver();
    };
  }, [page, loading]);

  //* To fetch the data from the api when ever the page/type changes.
  useEffect(() => {
    if (page !== -1) {
      dispatch(setLoading());
      dispatch(getDiscoversAPI({ type, page }));
    }
  }, [type, page]);

  return (
    <WholeDiv>
      <DisplayCardContainer>
        <h1>Discover {type === "movie" ? "Movies" : "Tv Shows"}</h1>

        <div>
          <CardWrapper>
            {data.length > 0
              ? data.map((item) => {
                  return (
                    <div key={item.id}>
                      <DisplayCard item={item} listenerType={view} />
                    </div>
                  );
                })
              : !loading && (
                  <h1 style={{ marginTop: "20px" }}>No data found</h1>
                )}
          </CardWrapper>
        </div>
        {loading && (
          <SpinnerWrapper style={{ height: "40px" }}>
            <CircularProgress />
          </SpinnerWrapper>
        )}
      </DisplayCardContainer>

      {page !== -1 && !loading && <div ref={lastElementRef}></div>}
    </WholeDiv>
  );
};

export default Discover;
