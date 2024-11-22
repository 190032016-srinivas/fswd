import "../Database/database.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { userData } from "../Models/user.js";

export const router = new express();

// Middlewares
router.use(cors());
router.use(bodyParser.json());
router.listen(3000, () => {
  console.log("server is running on 3000 port bro");
});
router.get("/", (req, res) => {
  res.send("Welcome to Youtube App Backend!");
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userData.findOne({ email });
    if (user) {
      return res.json({
        message: "USER ALREADY EXISTS",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    const token = await jwt.sign({ name, email }, "Srinivas_Secret_Key", {
      expiresIn: "12h",
    });
    const saveData = new userData({
      name,
      email,
      password: hashedPassword,
    });
    await saveData.save();

    res.json({
      message: "REGISTRATION SUCCESSFUL",
      token,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email1, password1 } = req.body;
    const user = await userData.findOne({ email: email1 });
    if (!user) {
      return res.json({
        message: "USER DOESN'T EXIST",
      });
    }

    const name = user.name;
    const email = user.email;
    const password = user.password;
    const checkPassword = await bcrypt.compare(password1, password);
    if (checkPassword) {
      const token = await jwt.sign({ name, email }, "Srinivas_Secret_Key", {
        expiresIn: "12h",
      });
      return res.json({
        message: "LOGIN SUCCESSFUL",
        token,
      });
    } else {
      res.json({
        message: "INVALID CREDENTIALS",
      });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});
