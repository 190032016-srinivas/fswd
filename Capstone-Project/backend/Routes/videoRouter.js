import { validVideos } from "../Models/videos.js";

export function videoRouter(server) {
  server.post("/videos/add", async (req, res) => {
    const arr = req.body;
    for (let videoDetails of arr) {
      await validVideos.create(videoDetails);
    }
    res.status(200).json({ message: "done" });
  });

  server.get("/videos", async (req, res) => {
    const allVideos = await validVideos.find({});
    return res.status(200).json(allVideos);
  });
}
