/* eslint-disable react/prop-types */
import { IMAGES_BASE_URL } from "../../../constants";

import {
  CardWrapper,
  DividerWrapper,
  ImagesCard,
  TrailersAndPosters,
} from "./style";
import {
  CardActionArea,
  CardMedia,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

const TrailersNPosters = ({ view, handleChange, images }) => {
  return (
    <>
      <TrailersAndPosters>
        <div className="toggle-btn">
          <h1>Media</h1>
          <ToggleButtonGroup
            color="primary"
            value={view}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="videos">Videos</ToggleButton>
            <ToggleButton value="backdrops">Backdrops</ToggleButton>
            <ToggleButton value="posters">posters</ToggleButton>
            <ToggleButton value="logos">Logos</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <CardWrapper className="card-wrapper">
          {images[view]?.map((item) => {
            return view === "videos" ? (
              <div key={item.key}>
                <iframe
                  className="video-player"
                  allowFullScreen
                  src={`https://www.youtube.com/embed/${item.key}`}
                />
              </div>
            ) : (
              <ImagesCard key={item.file_path}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="240"
                    width="480"
                    image={`${IMAGES_BASE_URL}${item.file_path}`}
                    alt="green iguana"
                  />
                </CardActionArea>
              </ImagesCard>
            );
          })}
        </CardWrapper>
      </TrailersAndPosters>

      <DividerWrapper>
        <Divider className="divider"></Divider>
      </DividerWrapper>
    </>
  );
};

export default TrailersNPosters;
