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

  server.get("/videos/:videoId", async (req, res) => {
    const videoId = req.params.videoId;
    const videoData = await validVideos.findOne({ _id: videoId });
    if (videoData) {
      return res.status(200).json(videoData);
    } else {
      return res
        .status(404)
        .json({ message: "could not find any matching video" });
    }
  });

  server.get("/videos/channel/:channelId", async (req, res) => {
    const channelId = req.params.channelId;
    const videoData = await validVideos.find({ channelId: channelId });

    return res.status(200).json(videoData);
  });

  server.get("/videos/search/:key", async (req, res) => {
    const filteredVideos = [];
    const key = req.params.key.toLowerCase();
    const allVideos = await validVideos.find({});
    for (let video of allVideos) {
      let title = video.title.toLowerCase();
      if (title.includes(key)) {
        filteredVideos.push(video);
      }
    }
    return res.status(200).json(filteredVideos);
  });
}
