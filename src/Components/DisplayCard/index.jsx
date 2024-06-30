/* eslint-disable react/prop-types */

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { MoviesCard } from "./style";

const DisplayCard = ({ item, handleClick, listenerType }) => {
  return (
    <div>
      <MoviesCard
        style={{ borderRadius: "16px" }}
        key={item.id}
        onClick={(e) =>
          handleClick(
            e,
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
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt="green iguana"
          />
          <Box
            sx={{
              position: "absolute",
              display: "inline-flex",
              top: "180px",
              left: "6px",
              color: "black",
            }}
          >
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
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="white"
                fontWeight={700}
              >
                {`${Math.round(item.vote_average * 10)}%`}
              </Typography>
            </Box>
          </Box>

          <CardContent stye={{ paddingBottom: "0px" }}>
            <div
              style={{
                minHeight: "70px",
                maxHeight: "80px",
              }}
            >
              <p
                style={{
                  color: "white",
                  height: "32px",
                  marginTop: "10px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span
                  style={
                    {
                      // marginBottom: "6px",
                      // overflow: "hidden",
                      // textOverflow: "ellipsis",
                      // width: "200px",
                      // whiteSpace: "nowrap",
                    }
                  }
                >
                  {item.original_title ?? item.original_name}
                </span>
                <span style={{ color: "grey", marginTop: "5px" }}>
                  {item.release_date ?? item.first_air_date}
                </span>
              </p>
            </div>
          </CardContent>
        </CardActionArea>
      </MoviesCard>
    </div>
  );
};

export default DisplayCard;
