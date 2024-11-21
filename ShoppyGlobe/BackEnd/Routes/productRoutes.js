import {
  addProductItem,
  getAllProductItems,
  getProductDetailsById,
} from "../Controller/productItem.controller.js";
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

export function productRoutes(server) {
  server.get("/products", authenticateUser, getAllProductItems);
  server.get("/products/:productId", authenticateUser, getProductDetailsById);
  server.post("/products/add", authenticateUser, addProductItem);
}
