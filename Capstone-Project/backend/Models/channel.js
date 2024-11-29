import mongoose from "mongoose";
import validator from "validator";
const channelModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },

  profilePic: {
    type: String,
  },
  bannerPic: {
    type: String,
  },
  subscribers: {
    type: Number,
    required: true,
  },
});

export const validChannels = mongoose.model("validChannels", channelModel);
