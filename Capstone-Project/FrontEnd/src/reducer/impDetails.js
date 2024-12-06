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
      const userName = localStorage.getItem("userName");
      const userEmail = localStorage.getItem("userName");
      state.impDetails.authToken = authToken;
      state.impDetails.userId = userId;
      state.impDetails.userPp = userPp;
      state.impDetails.userName = userName;
      state.impDetails.userEmail = userEmail;
      state.status = "succeeded";
    },
    saveUserDetails: (state, action) => {
      console.log("payload=", action.payload);
      const { authToken, userDetails, channelPp } = action.payload;
      state.impDetails.authToken = authToken;
      state.impDetails.userId = userDetails._id;
      state.impDetails.userName = userDetails.name;
      state.impDetails.userEmail = userDetails.email;
      state.impDetails.userPp = channelPp;
      state.status = "succeeded";
    },

    clearDetails: (state, action) => {
      state.impDetails = {};
    },
  },
});

export const { regainUserDetails, saveUserDetails, clearDetails } =
  impDetailsSlice.actions;
export default impDetailsSlice.reducer;
