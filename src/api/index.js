import axios from "axios";
import { TOKEN, API_KEY } from "../keys";
import { getApiUrls, urlType } from "../constants";
import { useSelector } from "react-redux";

export const APIInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
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

export const useSetStatus = () => {
  const { ACCOUNT_NO } = useSelector((state) => state.user);

  const setStatusAPI = (
    statusFor,
    id,
    flag,
    type,
    setheaderData,
    headerData
  ) => {
    const val = flag ? false : true;
    APIInstance.post(`account/${ACCOUNT_NO}/${statusFor}`, {
      media_type: type,
      media_id: id,
      [statusFor]: val,
    }).then((res) => {
      if (res.data.success === true) {
        setheaderData({ ...headerData, [statusFor]: val });
      }
    });
  };

  return { setStatusAPI };
};

export const getDiscoversAPI = async ({ type, page, dispatch }) => {
  try {
    if (page === -1) {
      return;
    }
    const res = await APIInstance(
      getApiUrls({
        urlFor: urlType.DISCOVER_MOVIES_SERIES,
        type,
        page,
      })
    );
    if (res.data.results.length === 0) {
      dispatch({ type: "SET_PAGE", payload: -1 });
      return;
    }
    dispatch({ type: "SET_DATA", payload: res.data.results });
  } catch (err) {
    console.error(err);
    dispatch({ type: "ERROR", payload: err });
  } finally {
    dispatch({ type: "SETTLED" });
  }
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
    getApiUrls({ urlFor: urlType.SELECTED_MOVIE_TV, type, id, API_KEY })
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

export const getMyCollectionsAPI = async ({
  page,
  view,
  listType,
  dispatch,
}) => {
  try {
    if (page === -1) {
      return;
    }
    const res = await APIInstance(
      getApiUrls({
        urlFor: urlType.WATCHLISTS_FAVORITES,
        getFor: listType,
        type: view,
        page: page,
      })
    );
    if (res.data.results.length === 0) {
      dispatch({ type: "SET_PAGE", payload: -1 });
      return;
    }
    dispatch({ type: "SET_DATA", payload: res.data.results });
  } catch (err) {
    console.error(err);
    dispatch({ type: "ERROR", payload: err });
  } finally {
    dispatch({ type: "SETTLED" });
  }
};
