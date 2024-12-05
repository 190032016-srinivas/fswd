import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  impDetails: {},
  status: "idle",
  error: null,
};

export const impDetailsSlice = createSlice({
  name: "impDetailsSliceName",
  initialState,
  reducers: {
    regainUserDetails: (state, action) => {
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");
      const userPp = localStorage.getItem("userPp");
      state.impDetails.authToken = authToken;
      state.impDetails.userId = userId;
      state.impDetails.userPp = userPp;
      state.status = "succeeded";
    },
    saveUserDetails: (state, action) => {
      console.log("payload=", action.payload);
      const { authToken, userId, channelPp } = action.payload;
      state.impDetails.authToken = authToken;
      state.impDetails.userId = userId;
      state.impDetails.userPp = channelPp;
      state.status = "succeeded";
    },
  },
});

export const { regainUserDetails, saveUserDetails } = impDetailsSlice.actions;
export default impDetailsSlice.reducer;
