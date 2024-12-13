import { validChannels } from "../Models/channel.js";

export function channelRouter(server) {
  server.get("/channel/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
      const channelDetails = await validChannels.findOne({ ownerId: userId });

      if (!channelDetails) {
        return res.status(400).json({ error: "Channel not found" });
      }

      return res.status(200).json(channelDetails);
    } catch (error) {
      return res.status(400).json({ error: "Failed to fetch channel details" });
    }
  });

  server.get("/getChannel/:channelId", async (req, res) => {
    const channelId = req.params.channelId;

    try {
      const channelDetails = await validChannels.findOne({ _id: channelId });

      if (!channelDetails) {
        return res.status(400).json({ error: "Channel not found" });
      }

      return res.status(200).json(channelDetails);
    } catch (error) {
      return res.status(400).json({ error: "Failed to fetch channel details" });
    }
  });

  server.put("/channel/:channelId", async (req, res) => {
    const channelId = req.params.channelId;
    const { previewChannelName, previewChannelThumbnail } = req.body;
    const result = await validChannels.updateOne(
      { _id: channelId },
      {
        $set: {
          name: previewChannelName,
          profilePic: previewChannelThumbnail,
        },
      }
    );
    if (!result.acknowledged) {
      return res.status(400).json({ message: "channel not found " });
    } else res.status(200).json({ message: "updated successfully " });
  });

  // server.post("/channel/add", async (req, res) => {
  //   const arr = req.body;
  //   for (let channelDetails of arr) {
  //     const newChannel = await validChannels.create(channelDetails);
  //   }
  //   res.status(200).json({ message: "new channel created",newChannel });
  // });
}
