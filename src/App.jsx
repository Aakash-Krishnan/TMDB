import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";
import SearchArea from "./Components/DisplayArea/SearchArea";
import MyCollectionsList from "./Pages/MyCollectionsList";
import DiscoverMovies from "./Pages/Discover/Movies";
import DiscoverSeries from "./Pages/Discover/Series";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:type/:id/:name" element={<MovieInfo />} />
        <Route path="/search/:type/:query" element={<SearchArea />} />
        <Route path="/my-list-of/:listType" element={<MyCollectionsList />} />
        <Route path="/movies-discover" element={<DiscoverMovies />} />
        <Route path="/series-discover" element={<DiscoverSeries />} />
      </Routes>
    </>
  );
}

export default App;
