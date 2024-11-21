import {
  addCartItem,
  getAllCartItems,
} from "../Controller/cartItem.controller.js";
import { login, register } from "../Controller/user.controller.js";

export function userRoutes(server) {
  server.post("/login", login);
  server.post("/register", register);
}
