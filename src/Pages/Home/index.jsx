import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import { HomeContainer } from "./style";
import { useSelector } from "react-redux";

const HomePage = () => {
  const specialsData = useSelector((state) => state.home);
  const { backDropImages } = specialsData;

  return (
    <HomeContainer>
      <SearchBox images={backDropImages} />

      {queries.map((query) => {
        return (
          <div className="contents" key={query.id}>
            <HomeContentPage {...query} />
          </div>
        );
      })}
    </HomeContainer>
  );
};

export default HomePage;
