import {
  addCartItem,
  deleteCartCompletely,
  deleteCartItem,
  getAllCartItems,
  updateCartItemCount,
} from "../Controller/cartItem.controller.js";
import jwt from "jsonwebtoken";
function authenticateUser(req, res, next) {
  let authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(403)
      .json({ message: "No token provided or invalid format" });
  }
  let authToken = authHeader.split(" ")[1];

  jwt.verify(authToken, "srinivas_secret_key", (error, payload) => {
    if (error) return res.status(403).json({ message: "invalid token" });
    else next();
  });
}

export function cartRoutes(server) {
  server.get("/cart/:userId", authenticateUser, getAllCartItems);
  server.post("/cart/add", authenticateUser, addCartItem);
  server.put("/cart/update", authenticateUser, updateCartItemCount);
  server.delete("/cart/delete/:userId/:id", authenticateUser, deleteCartItem);
  server.delete("/cart/clear/:userId", authenticateUser, deleteCartCompletely);
}
