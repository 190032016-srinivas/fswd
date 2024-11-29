import { validComments } from "../Models/comments.js";
import jwt from "jsonwebtoken";
import { validUsers } from "../Models/user.js";
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
  server.post("/user/login", addCartItem);
  server.post("/user/signup", addCartItem);
}
