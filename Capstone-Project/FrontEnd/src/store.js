import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/user";
import impDetailsReducer from "./reducer/impDetails.js";
export const store = configureStore({
  reducer: {
    impDetailsStoreKey: impDetailsReducer,
  },
});
