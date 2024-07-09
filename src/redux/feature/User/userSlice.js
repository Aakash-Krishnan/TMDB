import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIInstance } from "../../../api";

// TODO: Fix the issue with the Redirecting in build.
export const getApiKeyRequest = createAsyncThunk("user/getApiKey", async () => {
  try {
    const {
      data: { request_token },
    } = await APIInstance.get(`authentication/token/new`);
    window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://tmdb-clone-snowy.vercel.app//approved`;
    // window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/approved`;
  } catch (err) {
    return { err };
  }
});

export const getAccountDetails = createAsyncThunk(
  "user/getAccountDetails",
  async (payload, { getState }) => {
    try {
      const { request_token } = getState().user;
      console.log(request_token);
      const sessionId = await APIInstance.post(`authentication/session/new`, {
        request_token: request_token,
      });

      const accDetails = await APIInstance.get(
        `account?api_key=${request_token}&session_id=${sessionId.data.session_id}`
      );

      localStorage.setItem(
        "movieToken",
        JSON.stringify({
          timestamp: Date.now(),
          reqToken: request_token,
          sId: sessionId.data.session_id,
          accDetails: accDetails.data,
        })
      );

      return {
        sId: sessionId.data.session_id,
        accNo: accDetails.data.id,
        userName: accDetails.data.username,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

// TODO: Fix the issue with the sign out API.
export const deleteSession = createAsyncThunk(
  "user/deleteSession",
  async (payload, { getState }) => {
    try {
      console.log("ERROR", getState().user.sessionId);
      await APIInstance.delete(`authentication/session`, {
        session_id: getState().user.sessionId,
      });
      localStorage.removeItem("movieToken");
      return {};
    } catch (err) {
      return { err };
    }
  }
);

const initialState = {
  loading: true,
  approved: false,
  sessionId: "",
  request_token: "",
  _ACCOUNT_NO: "",
  userName: "",
  error: null,
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
      state.sessionId = sId;
      state.userName = userName;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAccountDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAccountDetails.fulfilled, (state, action) => {
      const { sId, accNo, userName } = action.payload;
      state._ACCOUNT_NO = accNo;
      state.sessionId = sId;
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
      initialState;
    });
    builder.addCase(deleteSession.rejected, (state, action) => {
      state.error = action.payload.err.response.data.status_message;
    });
  },
});

export const { reset, setApprove, setApiKey, setAccDetails } =
  userSlice.actions;
export default userSlice.reducer;
