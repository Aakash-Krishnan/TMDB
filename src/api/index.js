import axios from "axios";
import { TOKEN, ACCOUNT_NO, API_KEY } from "../keys";
import { apiURLS } from "../constants";
import { useNavigate } from "react-router-dom";

export const APIInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
  responseType: "json",
});

export const getStatusAPI = (result, type, id, setheaderData) => {
  APIInstance.get(`${type}/${id}/account_states`).then((res) => {
    result.favorite = res.data.favorite;
    result.watchlist = res.data.watchlist;
    setheaderData(result);
  });
};

export const setStatusAPI = (
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

export const useContentInfo = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, id, type) => {
    e.preventDefault();
    console.log(type);
    const tvCrewApi = APIInstance.get(apiURLS.getTvCrewURL(id));
    const tvRatingAPi = APIInstance.get(apiURLS.getTvRatingsURL(id));
    const data = APIInstance.get(
      apiURLS.getSelectedMovieTvURL(type, id, API_KEY)
    );

    const pSettled = Promise.allSettled([tvCrewApi, tvRatingAPi, data]);
    pSettled.then((res) => {
      let name = res[2]?.value?.data.title
        ? res[2]?.value?.data.title
        : res[2]?.value?.data.name;

      name = name.split(" ").join("-");
      navigate(`/info/${type}/${id}-${name}`, {
        state: {
          tvCrew: res[0]?.value?.data,
          tvRatings: res[1]?.value?.data,
          data: res[2]?.value?.data,
          type,
        },
      });
    });
  };

  return { handleNavigation };
};
