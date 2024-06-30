import { useState } from "react";
import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";

const HomePage = () => {
  const [images, setImages] = useState([]);

  const processImages = (data) => {
    data.map((item) => {
      setImages((prev) => [...prev, item.backdrop_path]);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <SearchBox images={images} />

      {queries.map((query) => {
        return (
          <div key={query.id}>
            <HomeContentPage {...query} processImages={processImages} />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
