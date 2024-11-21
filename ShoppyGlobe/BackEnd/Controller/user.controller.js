import { validUser } from "../Models/user.modal.js";
import jwt from "jsonwebtoken";
export async function login(req, res) {
  const userDetails = req.body;
  const verifiedUser = await validUser.findOne({ email: userDetails.email });
  if (!verifiedUser) {
    return res.status(400).json({ message: "please check credentials" });
  } else {
    if (verifiedUser.password === userDetails.password) {
      const authToken = jwt.sign(userDetails, "srinivas_secret_key");
      return res.status(200).json({
        authToken: authToken,
        user: verifiedUser,
      });
    } else {
      return res.status(400).json({ message: "please check credentials" });
    }
  }
}

export async function register(req, res) {
  const userDetails = req.body;
  const existingUser = await validUser.findOne({ email: userDetails.email });
  if (existingUser)
    return res.status(400).json({ message: "email already taken" });
  else {
    const newUser = await validUser.create(userDetails);
    return res.status(200).json({ message: "welcome" });
  }
}
