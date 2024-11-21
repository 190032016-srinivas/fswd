import { validCartItem } from "../Models/cartItems.model.js";

export async function addCartItem(req, res) {
  const cartitem = req.body;
  const existingCartItem = await validCartItem.findOne({
    id: cartitem.id,
    userId: cartitem.userId,
  });
  if (existingCartItem) {
    return res.status(400).json({ message: "cart item already added " });
  }
  const newCartItem = await validCartItem.create(req.body);
  if (!newCartItem) res.status(400).json({ message: "something went wrong" });
  else res.status(200).send(cartitem);
}

export async function getAllCartItems(req, res) {
  if (!req.params.userId)
    return res.status(400).json({ message: "something went wrong" });
  const allCartItems = await validCartItem.find({ userId: req.params.userId });
  res.status(200).send(allCartItems);
  // if (!allCartItems.length)
  //   res.status(400).json({ message: "something went wrong" });
  // else res.status(200).send(allCartItems);
}

export async function deleteCartItem(req, res) {
  if (!req.params.id || !req.params.userId)
    return res.status(400).json({ message: "invalid credentials  " });
  const deletedCartItem = await validCartItem.deleteOne({
    id: req.params.id,
    userId: req.params.userId,
  });
  if (deletedCartItem.deletedCount === 0) {
    return res.status(400).json({ message: "cart item not found maybe here " });
  } else res.status(200).json({ message: "deleted successfully " });
}

export async function deleteCartCompletely(req, res) {
  if (!req.params.userId)
    return res.status(400).json({ message: "invalid credentials  " });
  const deletedCartItem = await validCartItem.deleteMany({
    userId: req.params.userId,
  });
  if (deletedCartItem.deletedCount === 0) {
    return res.status(400).json({ message: "cart item not found here " });
  } else res.status(200).json({ message: "deleted successfully " });
}

export async function updateCartItemCount(req, res) {
  if (!req.body.id || !req.body.userId || !req.body.newCount)
    return res.status(400).json({ message: "invalid detials  " });
  const result = await validCartItem.updateOne(
    { userId: req.body.userId, id: req.body.id },
    { $set: { quantity: req.body.newCount } }
  );

  if (!result.acknowledged) {
    return res.status(400).json({ message: "cart item not found " });
  } else res.status(200).json({ message: "updated successfully " });
}
