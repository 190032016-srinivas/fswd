import { validChannels } from "../Models/channel.js";

export function channelRouter(server) {
  server.get("/channel/:userId", async (req, res) => {
    const userId = req.params.userId;
    const channelDetails = await validChannels.findOne({ ownerId: userId });
    return res.status(200).json(channelDetails);
  });
  // server.post("/channel/add", async (req, res) => {
  //   const arr = req.body;
  //   for (let channelDetails of arr) {
  //     const newChannel = await validChannels.create(channelDetails);
  //   }
  //   res.status(200).json({ message: "new channel created",newChannel });
  // });
}
