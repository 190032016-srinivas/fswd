import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  status: "idle",
  error: null,
};

export const impDetailsSlice = createSlice({
  name: "impDetails",
  initialState,
  reducers: {
    regainUserDetails: (state, action) => {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const userPp = localStorage.getItem("userPp");

      state.user.authToken = authToken;
      state.user.userId = userId;
      state.user.userPp = userPp;

      state.status = "succeeded";
    },
    saveUserDetails: (state, action) => {
      console.log("payload=", action.payload);
      const { authToken, userId, channelPp } = action.payload;
      state.user.authToken = authToken;
      state.user.userId = userId;
      state.user.userPp = channelPp;
    },
  },
});

export const { regainUserDetails, saveUserDetails } = impDetailsSlice.actions;
export default impDetailsSlice.reducer;
