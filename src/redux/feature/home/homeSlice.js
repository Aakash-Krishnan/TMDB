import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { APIInstance } from "../../../api";

export const getHomeDataAndBackDropsAPI = createAsyncThunk(
  "home/getHomeDataAndBackDropsAPI",
  async ({ queryPath, specials, getUrl }, { rejectWithValue }) => {
    const view = specials.split("-")[0];
    try {
      const endPoint = queryPath[0].endPoint ? view : undefined;
      const path = queryPath[0].endPoint ? queryPath[0].path : view;
      const url = getUrl(path, endPoint);

      const res = await APIInstance.get(url);
      return { res: res.data.results, specials };
    } catch (err) {
      const errMessage = err.response.data.status_message || "Unknown error";
      return rejectWithValue({ errMessage, specials });
    }
  }
);

const initialState = {
  homeData: {},
  backDropImages: [],
  error: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    reset: () => initialState,
    setHomeData: (state, action) => {
      state.homeData[action.payload] = {
        loading: true,
        data: [],
        error: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeDataAndBackDropsAPI.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getHomeDataAndBackDropsAPI.fulfilled, (state, action) => {
      const { res, specials } = action.payload;
      state.homeData[specials].data = res;
      state.homeData[specials].loading = false;
      state.backDropImages = state.backDropImages.concat(
        res.map((item) => item.backdrop_path)
      );
    });
    builder.addCase(getHomeDataAndBackDropsAPI.rejected, (state, action) => {
      const { errMessage, specials } = action.payload;
      state.homeData[specials].error = errMessage;
      state.homeData[specials].loading = false;
    });
  },
});

export const { reset, setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
