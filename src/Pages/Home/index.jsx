import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import { HomeContainer } from "./style";
import useAuth from "../../hooks/useAuth";

const HomePage = () => {
  useAuth();

  return (
    <HomeContainer>
      <SearchBox />

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
