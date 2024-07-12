import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { APIInstance } from "../../../api";

//NOTE: To run this in local add an .env file and add this your app base url
const REDIRECT_URL = import.meta.env.VITE_API_URL;

export const getApiKeyRequest = createAsyncThunk("user/getApiKey", async () => {
  try {
    const {
      data: { request_token },
    } = await APIInstance.get(`authentication/token/new`);
    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${REDIRECT_URL}/approved`;
  } catch (err) {
    return { err };
  }
});

export const getAccountDetails = createAsyncThunk(
  "user/getAccountDetails",
  async (payload, { getState, dispatch }) => {
    try {
      dispatch(setApiKey(payload));
      const { request_token } = getState().user;

      const _sessionId = await APIInstance.post(`authentication/session/new`, {
        request_token: request_token,
      });

      const accDetails = await APIInstance.get(
        `account?api_key=${request_token}&session_id=${_sessionId.data.session_id}`
      );

      localStorage.setItem(
        "movieToken",
        JSON.stringify(
          {
            timestamp: Date.now(),
            reqToken: request_token,
            sId: _sessionId.data.session_id,
            accDetails: accDetails.data,
          },
          null,
          2
        )
      );

      return {
        sId: _sessionId.data.session_id,
        accNo: accDetails.data.id,
        userName: accDetails.data.username,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

export const deleteSession = createAsyncThunk(
  "user/deleteSession",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const sId = getState().user._sessionId;
      if (!sId) {
        return rejectWithValue({ err: "No session found" });
      }

      const res = await APIInstance.delete(`authentication/session`, {
        data: { session_id: sId },
      });

      if (res.data.success) {
        localStorage.removeItem("movieToken");
        dispatch(sessionDeleted());
      }
      return {};
    } catch (err) {
      const errorMessage =
        err.response?.data?.status_message || "Unknown error";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  loading: true,
  _sessionId: "",
  request_token: "",
  _ACCOUNT_NO: "",
  userName: "",
  error: null,
  sessionDeleted: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setApiKey: (state, action) => {
      state.request_token = action.payload;
    },
    setAccDetails: (state, action) => {
      const { sId, accNo, userName } = action.payload;
      state._ACCOUNT_NO = accNo;
      state._sessionId = sId;
      state.userName = userName;
      state.loading = false;
    },
    sessionDeleted: (state) => {
      state.sessionDeleted = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      const { sId, accNo, userName } = action.payload;
      state._ACCOUNT_NO = accNo;
      state._sessionId = sId;
      state.userName = userName;
      state.loading = false;
    });
    builder.addCase(getAccountDetails.rejected, (state, action) => {
      const { err } = action.payload;
      state.err = err.response.data.status_message;
      state.loading = false;
    });

    builder.addCase(deleteSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSession.fulfilled, () => {
      return initialState;
    });
    builder.addCase(deleteSession.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { reset, setApprove, setApiKey, setAccDetails, sessionDeleted } =
  userSlice.actions;
export default userSlice.reducer;
