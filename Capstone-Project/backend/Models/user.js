import mongoose from "mongoose";
import validator from "validator";
const UserData = new mongoose.Schema({
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
  thumbnails: [
    {
      imageURL: {
        type: String,
      },
    },
  ],
  videos: [
    {
      videoURL: {
        type: String,
      },
    },
  ],
  likedVideos: [
    {
      videoURL: {
        type: String,
      },
      thumnailURL: {
        type: String,
      },
    },
  ],
});

export const userData = mongoose.model("userData", UserData);
