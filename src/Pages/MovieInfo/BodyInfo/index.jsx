/* eslint-disable react/prop-types */
import {
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
// import Card from "@mui/material/Card";

import { IMAGES_BASE_URL } from "../../../constants";
import { CardWrapper, MoviesCard } from "./style";

const BodyInfo = ({ tvCrew, type, data }) => {
  console.log(data);
  return (
    <div style={{ width: "80%", marginTop: "20px", padding: "10px 50px" }}>
      <h1>Top Billed Cast</h1>
      <div>
        <CardWrapper>
          {data == null ? (
            <Box
              sx={{
                display: "flex",
                placeItems: "center",
                height: "350px",
                margin: "auto",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            data.credits.cast.map((item) => {
              return (
                <div key={item.id}>
                  <div>
                    <MoviesCard style={{ borderRadius: "16px" }} key={item.id}>
                      <CardActionArea>
                        <CardMedia
                          style={{ borderRadius: "16px" }}
                          component="img"
                          height="200"
                          image={`${IMAGES_BASE_URL}${item.profile_path}`}
                          alt="green iguana"
                        />

                        <CardContent stye={{ paddingBottom: "0px" }}>
                          <div
                            style={{
                              minHeight: "70px",
                              maxHeight: "80px",
                            }}
                          >
                            <h3
                              style={{
                                color: "#0d253f",
                                height: "32px",
                                marginTop: "10px",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <span>
                                {item.original_title ?? item.original_name}
                              </span>
                              <span style={{ color: "grey", marginTop: "5px" }}>
                                {item.character}
                              </span>
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
      </div>
    </div>
  );
};

export default BodyInfo;
