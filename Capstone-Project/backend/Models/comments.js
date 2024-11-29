import mongoose, { mongo } from "mongoose";

const commentsModel = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userPP: {
    type: String,
    required: true,
  },
});

export const validComments = mongoose.model("validComments", commentsModel);
