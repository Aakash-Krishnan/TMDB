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


