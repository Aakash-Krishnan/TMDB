import axios from "axios";

export const API_KEY = "bb5060bd64cc3ba64180e29c4452ce60";

const token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjUwNjBiZDY0Y2MzYmE2NDE4MGUyOWM0NDUyY2U2MCIsIm5iZiI6MTcxOTU1MjAwOS4xNDc3MTcsInN1YiI6IjY2N2FmYjQwZTg0Zjk0M2QyOGU0NWIzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V9xurtBSn9r8jccXbTAPpVcavoKQEf7iU8gAapp4RqY";

export const APIInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    Authorization: `Bearer ${token}`,
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
  console.log(statusFor, id, flag, type, setheaderData, headerData);
  const val = flag ? false : true;
  APIInstance.post(`account/21348978/${statusFor}`, {
    media_type: type,
    media_id: id,
    [statusFor]: val,
  }).then((res) => {
    if (res.data.success === true) {
      setheaderData({ ...headerData, [statusFor]: val });
    }
  });
};
