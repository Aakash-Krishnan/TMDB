/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { getApiUrls, urlType } from "../../../constants";
import { Container } from "./style";
import { useEffect, useReducer } from "react";

import { APIInstance } from "../../../api/index";
import CastNCrew from "./CastNCrew";
import LatestSeasonInfo from "./LatestSeasonInfo";
import Reviews from "./Reviews";
import TrailersNPosters from "./TrailersNPosters";
import Recommendations from "./Recommendations";
import {
  bodyInfoInitialState,
  bodyInfoReducer,
} from "../../../reducers/bodyInfoReducer";

const BodyInfo = ({ type, data }) => {
  const [state, dispatch] = useReducer(bodyInfoReducer, bodyInfoInitialState);
  const { loading, images, recommendations, view } = state;

  useEffect(() => {
    const obj = {
      videos: data?.videos?.results,
      backdrops: data?.images?.backdrops,
      posters: data?.images?.posters,
      logos: data?.images?.logos,
    };
    dispatch({ type: "SET_IMAGES", payload: obj });
    dispatch({ type: "LOADING" });

    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await APIInstance.get(
        getApiUrls({
          urlFor: urlType.RECOMMENDATION,
          type,
          id: data.id,
          page: 1,
        })
      );
      dispatch({ type: "SET_RECOMMENDATIONS", payload: res.data.results });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err });
      console.log("ERROR ON RECOMMENDATIONS", err);
    }
  };

  const handleChange = (event, newView) => {
    if (newView) {
      dispatch({ type: "SET_VIEW", payload: newView });
    }
  };

  return (
    <Container>
      <div className="container-wrapper">
        <CastNCrew data={data} />

        {type === "tv" && <LatestSeasonInfo data={data} />}

        {data.reviews.results.length > 0 && <Reviews data={data} />}

        {Object.keys(images).length > 0 && (
          <TrailersNPosters
            view={view}
            handleChange={handleChange}
            images={images}
          />
        )}

        {recommendations.length > 0 && (
          <Recommendations
            loading={loading}
            recommendations={recommendations}
            type={type}
          />
        )}
      </div>
    </Container>
  );
};

export default BodyInfo;
