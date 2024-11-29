import mongoose from "mongoose";

const videoObjModel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ytUrl: {
    type: String,
    required: true,
  },
  Tag: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  uploaderId: {
    type: String,
    required: true,
  },
  uploaderName: {
    type: String,
    required: true,
  },
  uploaderPhoto: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  dislikes: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  views: {
    type: String,
    required: true,
  },
});

export const validVideos = mongoose.model("validVideos", videoObjModel);
