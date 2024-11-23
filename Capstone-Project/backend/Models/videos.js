import validator from "validator";
import mongoose from "mongoose";

const VideoData = new mongoose.Schema({
  uploader: {
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
  VideoData: [
    {
      thumbnailURL: {
        type: String,
        required: true,
      },
      videoURL: {
        type: String,
        required: true,
      },

      Title: {
        type: String,
        required: true,
      },
      Description: {
        type: String,
        required: true,
      },
      Tags: {
        type: String,
        required: true,
      },
    },
  ],
});

export const videodata = mongoose.model("videodata", VideoData);
