//$ styles
import { CardWrapper, DividerWrapper, MoviesCard } from "./style";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
} from "@mui/material";
import { SpinnerWrapper } from "../../../Components/DisplayArea/SearchArea/style";

//$ constants
import { IMAGES_BASE_URL } from "../../../constants";

const CastNCrew = ({ data }) => {
  return (
    <div>
      <h1>Top Billed Cast</h1>
      <div>
        <CardWrapper>
          {data == null ? (
            <SpinnerWrapper>
              <CircularProgress />
            </SpinnerWrapper>
          ) : (
            data.credits.cast.map((item) => {
              return (
                <div key={item.id}>
                  <div>
                    <MoviesCard key={item.id}>
                      <CardActionArea>
                        <CardMedia
                          className="card-media"
                          component="img"
                          image={`${IMAGES_BASE_URL}${item.profile_path}`}
                          alt="green iguana"
                        />

                        <CardContent className="card-content">
                          <div className="card-content-wrapper">
                            <h3>
                              <span>
                                {item.original_title ?? item.original_name}
                              </span>
                              <span>{item.character}</span>
                            </h3>
                          </div>
                        </CardContent>
                      </CardActionArea>
                    </MoviesCard>
                  </div>
                </div>
              );
            })
          )}
        </CardWrapper>
        <p className="full-cast">
          <i>full cast & crew</i>
        </p>
      </div>

      <DividerWrapper>
        <Divider className="divider"></Divider>
      </DividerWrapper>
    </div>
  );
};

export default CastNCrew;
