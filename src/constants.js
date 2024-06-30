import { v4 as uuidv4 } from "uuid";

export const navItems = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/contact",
    title: "Contact",
  },
  {
    path: "/movies",
    title: "Movies",
  },
  {
    path: "/tv-shows",
    title: "TV Shows",
  },
  {
    path: "/people",
    title: "People",
  },
  {
    path: "/sign-in",
    title: "Sign In",
  },
];

export const queries = [
  {
    id: uuidv4(),
    list: "Trending",
    listenerType: "",
    getUrl: (path, endPoint) => `/${path}/all/${endPoint}?language=en-US`,
    queryPath: [
      {
        id: uuidv4(),
        title: "Today",
        path: "trending",
        endPoint: "day",
      },
      {
        id: uuidv4(),
        title: "This week",
        path: "trending",
        endPoint: "week",
      },
    ],
  },
  {
    id: uuidv4(),
    list: "Movies",
    listenerType: "movie",
    getUrl: (path) =>
      `movie/${path}?language=en-US&page=1&append_to_response=media_type`,
    queryPath: [
      { id: uuidv4(), title: "Now Playing", path: "now_playing", endPoint: "" },
      { id: uuidv4(), title: "Popular", path: "popular", endPoint: "" },
      { id: uuidv4(), title: "Top Rated", path: "top_rated", endPoint: "" },
      { id: uuidv4(), title: "Upcoming", path: "upcoming", endPoint: "" },
    ],
  },
  {
    id: uuidv4(),
    list: "Tv Shows",
    listenerType: "tv",
    getUrl: (path) =>
      `tv/${path}?language=en-US&page=1&append_to_response=media_type`,
    queryPath: [
      {
        id: uuidv4(),
        title: "Airing Today",
        path: "airing_today",
        endPoint: "",
      },
      { id: uuidv4(), title: "Popular", path: "popular", endPoint: "" },
      { id: uuidv4(), title: "Top Rated", path: "top_rated", endPoint: "" },
      { id: uuidv4(), title: "On The Air", path: "on_the_air", endPoint: "" },
    ],
  },
];
