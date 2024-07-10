import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIInstance } from "../../../api";
import { getApiUrls, urlType } from "../../../constants";

export const getDiscoversAPI = createAsyncThunk(
  "discover/getDiscovers",
  async ({ type, page }) => {
    try {
      if (page === -1) {
        return;
      }
      console.log("TYPE: ", type);
      const res = await APIInstance(
        getApiUrls({
          urlFor: urlType.DISCOVER_MOVIES_SERIES,
          type,
          page,
        })
      );
      if (res.data.results.length === 0) {
        return { page: -1 };
      }
      return { data: res.data.results };
    } catch (err) {
      return { err };
    }
  }
);

const initialState = {
  loading: true,
  data: [],
  view: "movies",
  page: 1,
  error: null,
};

export const discoverSlice = createSlice({
  name: "discover",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.loading = true;
      state.data = [];
      state.page = 1;
      state.view = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setData: (state, action) => {
      state.loading = false;
      state.data = [...state.data, ...action.payload];
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDiscoversAPI.pending, (state) => {
      state.loading;
    });
    builder.addCase(getDiscoversAPI.fulfilled, (state, action) => {
      if (action.payload.page === -1) {
        state.page = -1;
      } else {
        state.data = [...state.data, ...action.payload.data];
      }
      state.loading = false;
    });
    builder.addCase(getDiscoversAPI.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export const { reset, setLoading, setData, setError, setPage } =
  discoverSlice.actions;
export default discoverSlice.reducer;
