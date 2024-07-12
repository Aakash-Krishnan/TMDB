//$ custom hooks
import useAuth from "../../hooks/useAuth";

//$ styles
import { HomeContainer } from "./style";

//$ constants and components
import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import SearchBox from "../../Components/Search";

const HomePage = () => {
  //* Custom hook for user authentication.
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
