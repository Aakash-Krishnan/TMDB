import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";
import SearchArea from "./Components/DisplayArea/SearchArea";
import MyCollectionsList from "./Pages/MyCollectionsList";
import Discover from "./Pages/Discover";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:type/:id/:name" element={<MovieInfo />} />
        <Route path="/search/:type/:query" element={<SearchArea />} />
        <Route path="/my-list-of/:listType" element={<MyCollectionsList />} />
        <Route path="/:discoverType" element={<Discover />} />
      </Routes>
    </>
  );
}

export default App;
