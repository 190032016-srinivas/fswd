import "../Database/database.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import { userData } from "../Models/user.js";
import { videodata } from "../Models/videos.js";

export const router = new express();

// Middlewares
router.use(cors());
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
    const token = jwt.sign({ name, email }, "Srinivas_Secret_Key", {
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
      const token = jwt.sign({ name, email }, "Srinivas_Secret_Key", {
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

router.get("/getchannel/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await userData.findOne({ email });
    if (!user) {
      return res.json({
        message: "USER DOESN'T EXIST",
      });
    } else {
      const channel = user.hasChannel;
      const profile = user.profilePic;
      const ChannelName = user.channelName;
      res.json({ channel, profile, ChannelName });
    }
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

router.post("/savechannel", async (req, res) => {
  try {
    const { email, ChannelName, profileURL } = req.body;
    const user = await userData.findOneAndUpdate(
      { email },
      {
        $set: {
          profilePic: profileURL,
          channelName: ChannelName,
          hasChannel: true,
        },
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.json({
        message: "USER DOESN'T EXIST",
      });
    }

    return res.json({
      message: "Channel saved successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred",
    });
  }
});

router.post("/publish", async (req, res) => {
  try {
    const {
      videoTitle,
      videoDescription,
      tags,
      videoLink,
      thumbnailLink,
      email,
    } = req.body;

    const user = await userData.findOne({ email });
    let videos = await videodata.findOne({ email });

    if (user) {
      user.videos.push({ videoURL: videoLink });
      user.thumbnails.push({ imageURL: thumbnailLink });

      if (!videos) {
        videos = new videodata({
          uploader: user.channelName,
          email,
          VideoData: [
            {
              thumbnailURL: thumbnailLink,
              videoURL: videoLink,
              Title: videoTitle,
              Description: videoDescription,
              Tags: tags,
            },
          ],
        });
      } else {
        videos.VideoData.push({
          thumbnailURL: thumbnailLink,
          videoURL: videoLink,
          Title: videoTitle,
          Description: videoDescription,
          Tags: tags,
        });
      }

      await user.save();
      await videos.save();

      return res.status(200).json({ message: "Video published" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred" });
  }
});
