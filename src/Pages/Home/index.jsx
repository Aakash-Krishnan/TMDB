import { useSelector } from "react-redux";
import SearchBox from "../../Components/Search";

import { queries } from "../../constants";
import HomeContentPage from "./homeContent";
import { HomeContainer } from "./style";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const HomePage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.request_token === "") {
      navigate("/");
    }
  }, []);

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
