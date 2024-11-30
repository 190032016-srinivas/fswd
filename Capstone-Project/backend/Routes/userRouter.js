import { validComments } from "../Models/comments.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validUsers } from "../Models/user.js";
import validator from "validator";

function authenticateUser(req, res, next) {
  const header = req.headers["authorization"];
  if (!header || !header.startsWith("Bearer")) {
    return res.status(403).json({ message: "no auth token provided" });
  }
  const token = header.split(" ")[1];
  jwt.verify(token, "Srinivas_Secret_Key", (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid auth token" });
    } else {
      next();
    }
  });
}

export function userRouter(server) {
  server.get("/user/:userId", authenticateUser, async (req, res) => {
    const userId = req.params.userId;
    const userDetails = await validUsers.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({ message: "no user found" });
    }
    return res.status(200).json(userDetails);
  });
  server.put(
    "/user/update/channelDetails",
    authenticateUser,
    async (req, res) => {
      const newUserDetails = req.body;
      const userId = newUserDetails["userId"];
      const existingDetails = await validUsers.findOne({ _id: userId });
      if (!existingDetails) {
        return res.status(404).json({ message: "no user found" });
      }

      return res
        .status(200)
        .json({ message: "update successful", newUserDetails });
    }
  );
  server.post("/user/login", async (req, res) => {
    const userDetails = req.body;
    const existingUser = await validUsers.findOne({ email: userDetails.email });
    if (!existingUser) {
      return res.status(400).json({ message: "no user found" });
    } else {
      const checkPassword = await bcrypt.compare(
        userDetails.password,
        existingUser.password
      );
      if (checkPassword) {
        const authToken = jwt.sign(userDetails, "Srinivas_Secret_Key");
        res.status(200).json({
          authToken,
          existingUser,
        });
      } else {
        return res.status(400).json({ message: "wrong password" });
      }
    }
  });
  server.post("/user/signup", async (req, res) => {
    const userDetails = req.body;
    const existingUser = await validUsers.findOne({ email: userDetails.email });
    if (existingUser) {
      return res.status(400).json({ message: "email already taken" });
    }
    userDetails.password = await bcrypt.hash(userDetails.password, 11);
    const newUser = await validUsers.create(userDetails);
    return res
      .status(200)
      .json({ message: "user signed up successfully", newUser });
  });
}
