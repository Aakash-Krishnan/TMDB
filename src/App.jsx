import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";
import SearchArea from "./Components/DisplayArea/SearchArea";
import Favorites from "./Pages/Favorites";
import Watchlists from "./Pages/Watchlists";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:type/:id/:name" element={<MovieInfo />} />
        <Route path="/search/:type/:query" element={<SearchArea />} />
        <Route path="/fav" element={<Favorites />} />
        <Route path="/watch-list" element={<Watchlists />} />
      </Routes>
    </>
  );
}

export default App;
