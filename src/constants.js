import { v4 as uuidv4 } from "uuid";
import { ACCOUNT_NO } from "./keys";

export const TMDB_LOGO =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg";

export const IMAGES_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const YOUTUBE_BASE_URL = " https://www.youtube.com/watch?v=";

export const urlType = {
  SEARCH: "search",
  TV_CREW: "tvCrew",
  TV_RATINGS: "tvRatings",
  WATCHLISTS_FAVORITES: "watchListsAndFavorites",
  SELECTED_MOVIE_TV: "selectedMovieTv",
  SELECTED_MOVIE_TV_WATCHPROVIDERS: "selectedMovieTvWatchProviders",
  RECOMMENDATION: "recommendations",
  TRENDING: "trending",
  TOP_MOVIES: "topMovies",
  TOP_TV_SHOWS: "topTvShows",
  DISCOVER_MOVIES_SERIES: "discoverMoviesSeries",
};

export const getApiUrls = ({
  urlFor,
  type,
  query,
  id,
  getFor,
  API_KEY,
  endPoint,
  path,
  page = 1,
}) => {
  switch (urlFor) {
    case urlType.SEARCH:
      return `search/${type}?query=${query}&include_adult=false&language=en-US&page=${page}`;
    case urlType.TV_CREW:
      return `/tv/${id}/aggregate_credits?language=en-US`;
    case urlType.TV_RATINGS:
      return `/tv/${id}/content_ratings`;
    case urlType.WATCHLISTS_FAVORITES:
      return `account/${ACCOUNT_NO}/${getFor}/${type}?language=en-US&page=${page}&sort_by=created_at.asc`;
    case urlType.SELECTED_MOVIE_TV:
      return `${type}/${id}?api_key=${API_KEY}/content_ratings&append_to_response=credits,videos,images,release_dates,reviews`;
    case urlType.SELECTED_MOVIE_TV_WATCHPROVIDERS:
      return `${type}/${id}/watch/providers`;
    case urlType.RECOMMENDATION:
      return `/${type}/${id}/recommendations?language=en-US&page=${page}`;
    case urlType.TRENDING:
      return `/${path}/all/${endPoint}?language=en-US`;
    case urlType.TOP_MOVIES:
      return `movie/${path}?language=en-US&page=${page}&append_to_response=media_type`;
    case urlType.TOP_TV_SHOWS:
      return `tv/${path}?language=en-US&page=${page}&append_to_response=media_type`;
    case urlType.DISCOVER_MOVIES_SERIES:
      return `discover/${type}?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc'`;
  }
};

export const navItems = [
  {
    path: "/home",
    title: "Home",
  },

  {
    path: "/my-list-of/favorite",
    title: "Favorites",
  },
  {
    path: "/my-list-of/watchlist",
    title: "Watch List",
  },

  {
    path: "/movie-discover",
    title: "Movies",
  },
  {
    path: "/tv-discover",
    title: "TV Shows",
  },
  // {
  //   path: "/people",
  //   title: "People",
  // },
  // {
  //   path: "/contact",
  //   title: "Contact",
  // },
  // {
  //   path: "/sign-in",
  //   title: "Sign In",
  // },
];

export const searchViews = [
  {
    view: "movie",
    title: "Movies",
  },
  {
    view: "tv",
    title: "Tv Shows",
  },
  {
    view: "person",
    title: "People",
  },
  {
    view: "collection",
    title: "Collections",
  },
];

export const queries = [
  {
    id: uuidv4(),
    list: "Trending",
    listenerType: "",
    getUrl: (path, endPoint) =>
      getApiUrls({ urlFor: urlType.TRENDING, path, endPoint }),
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
    getUrl: (path) => getApiUrls({ urlFor: urlType.TOP_MOVIES, path }),
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
    getUrl: (path) => getApiUrls({ urlFor: urlType.TOP_TV_SHOWS, path }),
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
