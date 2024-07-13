//$ custom hooks
import { useContentInfoNavigation } from "../../hooks/useContentInfoNavigation";

//$ styles
import {
  CardContentWrapper,
  MoviesCard,
  ProgressCircle,
  ProgressLabel,
} from "./style";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

//$ constants
import { IMAGES_BASE_URL } from "../../constants";

const DisplayCard = ({ item, listenerType }) => {
  //* custom hook to handle navigation.
  const { handleNavigation } = useContentInfoNavigation();

  return (
    <div>
      <MoviesCard
        key={item.id}
        onClick={() =>
          handleNavigation(
            item.original_title ?? item.name ?? item.original_name,
            item.id,
            item.media_type ? item.media_type : listenerType
          )
        }
      >
        <CardActionArea style={{ backgroundColor: "#0d253f" }}>
          <CardMedia
            style={{ borderRadius: "16px" }}
            component="img"
            height="200"
            image={`${IMAGES_BASE_URL}${item.poster_path ?? item.profile_path}`}
            alt="green iguana"
          />
          {item.vote_average && (
            <>
              <ProgressCircle>
                <CircularProgress
                  variant="determinate"
                  value={Math.round(item.vote_average * 10)}
                  thickness={5}
                  color={
                    Math.round(item.vote_average * 10) > 70
                      ? "success"
                      : Math.round(item.vote_average * 10) > 40
                      ? "warning"
                      : "inherit"
                  }
                />
                <ProgressLabel>
                  <p className="label">
                    {`${Math.round(item.vote_average * 10)}%`}
                  </p>
                </ProgressLabel>
              </ProgressCircle>
            </>
          )}

          <CardContent stye={{ paddingBottom: "0px" }}>
            <CardContentWrapper>
              <div>
                <span>
                  {item.original_title ?? item.name ?? item.original_name}
                </span>
                <span className="air-date">
                  {item.release_date ?? item.first_air_date}
                </span>
              </div>
            </CardContentWrapper>
          </CardContent>
        </CardActionArea>
      </MoviesCard>
    </div>
  );
};

export default DisplayCard;
