import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { commentRouter } from "./Routes/commentRouter.js";

const myServer = new express();

myServer.use(express.json());
myServer.use(cors());
myServer.listen(3000, () => {
  console.log("server is running on 3000 port bro");
});

mongoose
  .connect(
    "mongodb+srv://srinivas-bodduru:Srinivas%402001@capstone-project-databa.acwhv.mongodb.net/?retryWrites=true&w=majority&appName=Capstone-Project-Database",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB:", err));

commentRouter(myServer);
