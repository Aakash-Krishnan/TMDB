import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useDispatch, useSelector } from "react-redux";

//$ reducers
import { setAccDetails } from "./redux/feature/User/userSlice";

//$ components & pages
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import Discover from "./Pages/Discover";
import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import LoginApproved from "./Pages/Login/LoginApproved";
import MyCollectionsList from "./Pages/MyCollectionsList";
import SearchArea from "./Components/DisplayArea/SearchArea";

function App() {
  const dispatch = useDispatch();
  const { approved } = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("movieToken")) {
      const { sId, accDetails } = JSON.parse(
        localStorage.getItem("movieToken")
      );
      dispatch(
        setAccDetails({
          sId: sId,
          accNo: accDetails.id,
          userName: accDetails.username,
        })
      );
    }
  }, [approved]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/approved" element={<LoginApproved />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/info/:type/:id/:name" element={<MovieInfo />} />
        <Route path="/search/:type/:query" element={<SearchArea />} />
        <Route path="/my-list-of/:listType" element={<MyCollectionsList />} />
        <Route path="/:discoverType" element={<Discover />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
