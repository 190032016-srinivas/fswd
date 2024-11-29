import { validComments } from "../Models/comments.js";

export function commentRouter(server) {
  server.get("/comments/:videoId", async (req, res) => {
    const videoId = req.params.videoId;
    const response = await validComments.find({ videoId: videoId });
    return res.status(200).json({
      comments: response,
    });
  });
  server.post("/comments/add", async (req, res) => {
    const comment = req.body;
    const newComment = await validComments.create(comment);
    if (!newComment) res.status(400).json({ message: "something went wrong" });
    else res.status(200).json({ comment: newComment });
  });
  server.put("/comments/update", async (req, res) => {
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
  server.delete("/comments/delete/:commentId", async (req, res) => {
    const commentId = req.params.commentId;
    const deleteComment = await validComments.deleteOne({ _id: commentId });
    if (deleteComment.deletedCount === 0) {
      return res.status(400).json({ message: "comment not found " });
    } else res.status(200).json({ message: "deleted successfully " });
  });
}
