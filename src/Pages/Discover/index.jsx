/* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { CardWrapper, DisplayCardContainer, WholeDiv } from "./style";
import { CircularProgress } from "@mui/material";
import DisplayCard from "../../Components/DisplayCard";
import { SpinnerWrapper } from "../../Components/DisplayArea/SearchArea/style";
import { useInfiniteLoad } from "../../hooks/useInfiniteLoad";
import { useParams } from "react-router-dom";

import useAuth from "../../hooks/useAuth.js";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscoversAPI,
  reset,
  setLoading,
  setPage,
} from "../../redux/feature/Discover/discoverSlice.js";

const Discover = () => {
  useAuth();

  const { discoverType } = useParams();
  const type = discoverType.split("-")[0];
  const dispatch = useDispatch();
  const discoverData = useSelector((state) => state.discover);
  const { data, loading, page, view } = discoverData;

  // const { lastElementRef, elementObserver } = useInfiniteLoad();

  useEffect(() => {
    dispatch(reset(type));
  }, [type]);

  // TODO: Fix the issue with the infinite scroll
  // useEffect(() => {
  //   elementObserver({
  //     loading,
  //     page,
  //     callBackFn: (res) => {
  //       console.log("CALLBACK", res);
  //       dispatch({ type: "SET_PAGE", payload: res });
  //     },
  //   });
  // }, [page, loading]);

  useEffect(() => {
    dispatch(setLoading());
    dispatch(getDiscoversAPI({ type, page }));
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
          <SpinnerWrapper>
            <CircularProgress />
          </SpinnerWrapper>
        )}
      </DisplayCardContainer>

      {page !== -1 && !loading && (
        <div
          style={{
            cursor: "pointer",
            padding: "10px",
            textAlign: "center",
            backgroundColor: "#0d253f",
            color: "white",
          }}
          // ref={lastElementRef}
          onClick={() => dispatch(setPage(page + 1))}
        >
          Load more
        </div>
      )}
    </WholeDiv>
  );
};

export default Discover;
