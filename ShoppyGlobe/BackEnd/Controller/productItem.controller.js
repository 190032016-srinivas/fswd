import { validProductItem } from "../Models/productItems.model.js";
import { readFileSync } from "fs"; // Import specific function from 'fs'
import path from "path";
const __dirname = path.dirname(new URL(import.meta.url).pathname);
export async function addProductItem(req, res) {
  const newProductItemsArray = await validProductItem.create(req.body);
  if (!newProductItemsArray)
    res.status(400).json({ message: "something went wrong" });
  else res.status(200).send(newProductItemsArray);
}

export async function getAllProductItems(req, res) {
  let allProductItems = await validProductItem.find();
  if (!allProductItems || allProductItems.length < 1) {
    const dataPath = path.join(
      __dirname,
      "..",
      "..",
      "src",
      "preMadeProducts.json"
    );
    const data = readFileSync(dataPath, "utf-8");
    const parsedData = JSON.parse(data);
    allProductItems = await validProductItem.create(parsedData);
    // res.status(400).json({ message: "something went wrong" });
  }
  res.status(200).json({ products: allProductItems });
}

export async function getProductDetailsById(req, res) {
  if (req.params.productId.length !== 24)
    return res.status(400).json({ message: "invalid id length" });
  const productFromDb = await validProductItem.findOne({
    _id: req.params.productId,
  });
  if (!productFromDb) res.status(400).json({ message: "something went wrong" });
  else res.status(200).json({ productFromDb: productFromDb });
}
