import { useState } from "react";
import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import DisplayArea from "../../Components/DisplayArea";

const HomePage = () => {
  const [searchData, setSearchData] = useState([]);
  const [images, setImages] = useState([]);

  const getSearchData = (data) => {
    setSearchData(data);
  };

  const processImages = (data) => {
    data.map((item) => {
      setImages((prev) => [...prev, item.backdrop_path]);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <SearchBox getSearchData={getSearchData} images={images} />
      {searchData.length > 0 ? (
        <DisplayArea data={searchData} />
      ) : (
        queries.map((query) => {
          return (
            <div key={query.id}>
              <HomeContentPage {...query} processImages={processImages} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default HomePage;
