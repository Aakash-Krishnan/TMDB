import { CardWrapper, RecommendationsWrapper } from "./style";
import { CircularProgress } from "@mui/material";
import { SpinnerWrapper } from "../../../Components/DisplayArea/SearchArea/style";

import DisplayCard from "../../../Components/DisplayCard";

const Recommendations = ({ loading, recommendations, type }) => {
  return (
    <>
      <RecommendationsWrapper>
        <h2>Recommendations</h2>
        <div>
          <CardWrapper>
            {loading ? (
              <SpinnerWrapper>
                <CircularProgress />
              </SpinnerWrapper>
            ) : (
              recommendations.length > 0 &&
              recommendations?.map((item) => {
                return (
                  <div key={item.id}>
                    <DisplayCard item={item} listenerType={type} />
                  </div>
                );
              })
            )}
          </CardWrapper>
        </div>
      </RecommendationsWrapper>
    </>
  );
};

export default Recommendations;
