import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  hobby: {
    type: String,
    required: true,
  },
});

export const validUser = mongoose.model("validUser", userSchema);
