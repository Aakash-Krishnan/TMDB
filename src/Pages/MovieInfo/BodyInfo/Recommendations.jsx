/* eslint-disable react/prop-types */
import { CardWrapper, RecommendationsWrapper } from "./style";
import { SpinnerWrapper } from "../../../Components/DisplayArea/SearchArea/style";
import { CircularProgress } from "@mui/material";
import { useContentInfo } from "../../../api";
import DisplayCard from "../../../Components/DisplayCard";

const Recommendations = ({ loading, recommendations, type }) => {
  const { handleNavigation } = useContentInfo();

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
                    <DisplayCard
                      item={item}
                      handleClick={handleNavigation}
                      listenerType={type}
                    />
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
