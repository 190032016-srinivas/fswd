import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { cartRoutes } from "./Routes/cartRoutes.js";
import { productRoutes } from "./Routes/productRoutes.js";
import { userRoutes } from "./Routes/userRoutes.js";
import jwt from "jsonwebtoken";

const myServer = new express();
myServer.use(express.json());
myServer.use(cors());
myServer.listen(3000, () => {
  console.log("server is running on 3000 port bro");
});

mongoose.connect("mongodb://localhost:27017/");

cartRoutes(myServer);
productRoutes(myServer);
userRoutes(myServer);
