import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { APIInstance } from "../../../api";

export const getHomeDataAndBackDropsAPIByRedux = createAsyncThunk(
  "home/getHomeDataAndBackDropsAPIByRedux",
  async ({ queryPath, specials, getUrl }) => {
    const view = specials.split("-")[0];
    try {
      const endPoint = queryPath[0].endPoint ? view : undefined;
      const path = queryPath[0].endPoint ? queryPath[0].path : view;
      const url = getUrl(path, endPoint);

      const res = await APIInstance.get(url);
      return { res: res.data.results, specials };
    } catch (err) {
      return { err, specials };
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
    builder.addCase(getHomeDataAndBackDropsAPIByRedux.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getHomeDataAndBackDropsAPIByRedux.fulfilled,
      (state, action) => {
        const { res, specials } = action.payload;
        state.homeData[specials].data = res;
        state.homeData[specials].loading = false;
        state.backDropImages = state.backDropImages.concat(
          res.map((item) => item.backdrop_path)
        );
      }
    );
    builder.addCase(
      getHomeDataAndBackDropsAPIByRedux.rejected,
      (state, action) => {
        const { err, specials } = action.payload;
        state.homeData[specials] = err.response.data.status_message;
      }
    );
  },
});

export const { reset, setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
