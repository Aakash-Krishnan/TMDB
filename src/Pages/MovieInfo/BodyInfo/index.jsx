import { useCallback, useEffect, useReducer } from "react";

//$ styles
import { Container } from "./style";

import {
  bodyInfoInitialState,
  bodyInfoReducer,
} from "../../../reducers/bodyInfoReducer";

//$ APIs and components
import { getRecommendationsAPI } from "../../../api/index";
import CastNCrew from "./CastNCrew";
import LatestSeasonInfo from "./LatestSeasonInfo";
import Reviews from "./Reviews";
import TrailersNPosters from "./TrailersNPosters";
import Recommendations from "./Recommendations";

const BodyInfo = ({ type, data }) => {
  const [{ loading, images, recommendations, view }, dispatch] = useReducer(
    bodyInfoReducer,
    bodyInfoInitialState
  );

  useEffect(() => {
    const obj = {
      videos: data?.videos?.results,
      backdrops: data?.images?.backdrops,
      posters: data?.images?.posters,
      logos: data?.images?.logos,
    };
    dispatch({ type: "SET_IMAGES", payload: obj });
    dispatch({ type: "LOADING" });

    getRecommendationsAPI({ id: data.id, type, dispatch });
  }, []);

  const handleChange = useCallback((_, newView) => {
    if (newView) {
      dispatch({ type: "SET_VIEW", payload: newView });
    }
  }, []);

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
