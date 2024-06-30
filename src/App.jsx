import { Routes, Route } from "react-router";
import "./App.css";

import Navbar from "./Components/navBar";
import MovieInfo from "./Pages/MovieInfo/movieInfo";
import HomePage from "./Pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieInfo />} />
      </Routes>
    </>
  );
}

export default App;
