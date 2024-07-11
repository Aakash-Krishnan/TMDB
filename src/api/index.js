import axios from "axios";
import { getApiUrls, urlType } from "../constants";

const apiKey = import.meta.env.VITE_API_KEY;
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

export const APIInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  responseType: "json",
});

export const getStatusAPI = (result, type, id, callBackFn) => {
  APIInstance.get(`${type}/${id}/account_states`).then((res) => {
    result.favorite = res.data.favorite;
    result.watchlist = res.data.watchlist;

    callBackFn(result);
  });
};

export const getHomeDataAndBackDropsAPI = async ({
  queryPath,
  specials,
  getUrl,
  processImages,
  dispatch,
}) => {
  try {
    const endPoint = queryPath[0].endPoint ? specials : undefined;
    const path = queryPath[0].endPoint ? queryPath[0].path : specials;
    const url = getUrl(path, endPoint);

    const res = await APIInstance.get(url);
    dispatch({ type: "SET_DATA", payload: res.data.results });
    processImages(res.data.results, specials);
  } catch (err) {
    dispatch({ type: "ERROR", payload: err });
    console.log("ERROR COLLECTING IMAGES:", err);
  }
};

export const getMovieInfoDataAPI = async ({ id, type, dispatch }) => {
  const tvCrewApi = APIInstance.get(
    getApiUrls({ urlFor: urlType.TV_CREW, id })
  );
  const tvRatingAPi = APIInstance.get(
    getApiUrls({ urlFor: urlType.TV_RATINGS, id })
  );
  const data = APIInstance.get(
    getApiUrls({ urlFor: urlType.SELECTED_MOVIE_TV, type, id, apiKey })
  );
  const watchProviders = APIInstance.get(
    getApiUrls({ urlFor: urlType.SELECTED_MOVIE_TV_WATCHPROVIDERS, type, id })
  );

  const pSettled = Promise.allSettled([
    tvCrewApi,
    tvRatingAPi,
    data,
    watchProviders,
  ]);

  pSettled.then((res) => {
    dispatch({ type: "SET_DATA", payload: res });
  });
};

export const getRecommendationsAPI = async ({ id, type, dispatch }) => {
  try {
    const res = await APIInstance.get(
      getApiUrls({
        urlFor: urlType.RECOMMENDATION,
        type,
        id: id,
        page: 1,
      })
    );
    dispatch({ type: "SET_RECOMMENDATIONS", payload: res.data.results });
  } catch (err) {
    dispatch({ type: "ERROR", payload: err });
    console.log("ERROR ON RECOMMENDATIONS", err);
  }
};
