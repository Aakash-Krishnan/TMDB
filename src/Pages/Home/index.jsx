import { useState } from "react";
import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import { HomeContainer } from "./style";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [imageTag, setImageTag] = useState([]);

  const processImages = (data, specials) => {
    if (imageTag.indexOf(specials) !== -1) return;

    setImageTag((prev) => [...prev, specials]);
    data.map((item) => {
      setImages((prev) => [...prev, item.backdrop_path]);
    });
  };

  return (
    <HomeContainer>
      <SearchBox images={images} />

      {queries.map((query) => {
        return (
          <div className="contents" key={query.id}>
            <HomeContentPage {...query} processImages={processImages} />
          </div>
        );
      })}
    </HomeContainer>
  );
};

export default HomePage;
