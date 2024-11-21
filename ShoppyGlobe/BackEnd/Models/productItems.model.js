import mongoose from "mongoose";

const ProductItemSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  availabilityStatus: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  warrantyInformation: {
    type: String,
    required: true,
  },
  returnPolicy: {
    type: String,
    required: true,
  },

  stockQuantity: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
  },
});

export const validProductItem = mongoose.model(
  "validProductItem",
  ProductItemSchema
);
