import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./feature/home/homeSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
  },
});
