/* eslint-disable react/prop-types */
import { getApiUrls, urlType } from "../../../constants";
import { Container } from "./style";
import { useEffect, useState } from "react";

import { APIInstance } from "../../../api/index";
import CastNCrew from "./CastNCrew";
import LatestSeasonInfo from "./LatestSeasonInfo";
import Reviews from "./Reviews";
import TrailersNPosters from "./TrailersNPosters";
import Recommendations from "./Recommendations";

const BodyInfo = ({ type, data }) => {
  const [view, setView] = useState("videos");
  const [images, setImages] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obj = {
      videos: data?.videos?.results,
      backdrops: data?.images?.backdrops,
      posters: data?.images?.posters,
      logos: data?.images?.logos,
    };
    setImages(obj);
    setLoading(true);
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
        setRecommendations(res.data.results);
        setLoading(false);
      } catch (err) {
        console.log("ERROR ON RECOMMENDATIONS", err);
      }
    };

    fetchRecommendations();
  }, []);

  // console.log(images);

  const handleChange = (event, newView) => {
    if (newView) {
      setView(newView);
    }
  };
  // console.log(data);
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
