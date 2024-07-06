import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./feature/home/homeSlice";
import userReducer from "./feature/User/userSlice";

export const store = configureStore({
  reducer: {
    home: homeReducer,
    user: userReducer,
  },
});
