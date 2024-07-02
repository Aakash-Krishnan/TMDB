import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";
import SearchArea from "./Components/DisplayArea/SearchArea";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/info/:type/:id" element={<MovieInfo />} />
          <Route path="/search/:type/:query" element={<SearchArea />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
