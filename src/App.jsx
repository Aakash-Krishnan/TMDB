import { Routes, Route } from "react-router";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";
import SearchArea from "./Components/DisplayArea/SearchArea";
import MyCollectionsList from "./Pages/MyCollectionsList";
import Discover from "./Pages/Discover";
import LoginPage from "./Pages/Login";
import LoginApproved from "./Pages/Login/LoginApproved";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccDetails } from "./redux/feature/User/userSlice";

function App() {
  const dispatch = useDispatch();
  const { approved } = useSelector((state) => state.user);

  useEffect(() => {
    if (localStorage.getItem("movieToken") !== null) {
      console.log("NAVIGATING TO HOME");

      const { sId, accDetails } = JSON.parse(
        localStorage.getItem("movieToken")
      );
      console.log(sId, accDetails);
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
