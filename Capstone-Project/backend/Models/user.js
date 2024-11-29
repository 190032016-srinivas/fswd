import mongoose from "mongoose";
import validator from "validator";
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
});

export const validUsers = mongoose.model("validUsers", userModel);
