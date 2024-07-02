import { v4 as uuidv4 } from "uuid";
import { ACCOUNT_NO } from "./keys";

export const TMDB_LOGO =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const YOUTUBE_BASE_URL = " https://www.youtube.com/watch?v=";

export const apiURLS = {
  getSearchURL: (type, value, pageNo = 1) =>
    `search/${type}?query=${value}&include_adult=false&language=en-US&page=${pageNo}`,
  getTvCrewURL: (id) => `/tv/${id}/aggregate_credits?language=en-US`,
  getTvRatingsURL: (id) => `/tv/${id}/content_ratings`,
  getWatchListsAndFavorites: (getFor, type, page = 1) =>
    `account/${ACCOUNT_NO}/${getFor}/${type}?language=en-US&page=${page}&sort_by=created_at.asc`,
  getSelectedMovieTvURL: (type, id, API_KEY) =>
    `${type}/${id}?api_key=${API_KEY}/content_ratings&append_to_response=credits,videos,images,release_dates,reviews`,
  getSelectedMovieTvWatchProvidersURL: (type, id) =>
    `${type}/${id}/watch/providers`,
  getRecommendations: (type, id, page = 1) =>
    `/${type}/${id}/recommendations?language=en-US&page=${page}`,
  getTrendingURL: (path, endPoint) => `/${path}/all/${endPoint}?language=en-US`,
  getTopMoviesURL: (path, pageNo = 1) =>
    `movie/${path}?language=en-US&page=${pageNo}&append_to_response=media_type`,
  getTopTvShowsURL: (path, pageNo = 1) =>
    `tv/${path}?language=en-US&page=${pageNo}&append_to_response=media_type`,
};

export const navItems = [
  {
    path: "/",
    title: "Home",
  },

  {
    path: "/fav",
    title: "Favorites",
  },
  {
    path: "/watch-list",
    title: "Watch List",
  },
  {
    path: "/people",
    title: "People",
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
    path: "/contact",
    title: "Contact",
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
    getUrl: (path, endPoint) => apiURLS.getTrendingURL(path, endPoint),
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
    getUrl: (path) => apiURLS.getTopMoviesURL(path),
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
    getUrl: (path) => apiURLS.getTopTvShowsURL(path),
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
