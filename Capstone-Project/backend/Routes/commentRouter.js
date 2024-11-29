import { validComments } from "../Models/comments.js";
import jwt from "jsonwebtoken";
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

export function commentRouter(server) {
  server.get("/comments/:videoId", async (req, res) => {
    const videoId = req.params.videoId;
    const comments = await validComments.find({ videoId: videoId });
    return res.status(200).json(comments);
  });
  server.post("/comments/add", authenticateUser, async (req, res) => {
    const comment = req.body;
    const newComment = await validComments.create(comment);
    if (!newComment) res.status(400).json({ message: "something went wrong" });
    else res.status(200).json(newComment);
  });
  server.put("/comments/update", authenticateUser, async (req, res) => {
    const { commentId, newComment } = req.body;
    const result = await validComments.updateOne(
      { _id: commentId },
      { $set: { comment: newComment } }
    );
    console.log("result=", result, commentId, newComment);
    if (!result.acknowledged) {
      return res.status(400).json({ message: "comment not found " });
    } else
      res.status(200).json({ message: "updated successfully ", newComment });
  });
  server.delete(
    "/comments/delete/:commentId",
    authenticateUser,
    async (req, res) => {
      const commentId = req.params.commentId;
      const deleteComment = await validComments.deleteOne({ _id: commentId });
      if (deleteComment.deletedCount === 0) {
        return res.status(400).json({ message: "comment not found " });
      } else res.status(200).json({ message: "deleted successfully " });
    }
  );
}
