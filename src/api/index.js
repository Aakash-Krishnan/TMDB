import axios from "axios";
import { TOKEN, ACCOUNT_NO } from "../keys";

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
