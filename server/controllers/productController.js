import mongoose from "mongoose";
import Product from "../models/Product.js";

const validateProductInput = ({ name, price, image }) => {
  if (typeof name !== "string" || !name.trim()) return "Product name is required";
  if (price === "" || price === undefined || !Number.isFinite(Number(price)) || Number(price) < 0) {
    return "Enter a valid non-negative price";
  }
  if (typeof image !== "string" || !/^data:image\/(png|jpe?g|webp);base64,/i.test(image)) {
    return "Choose a PNG, JPG, or WebP image";
  }
  if (Buffer.byteLength(image, "utf8") > 1_400_000) return "Image is too large. Maximum size is 1 MB.";
  return null;
};

export const getProducts = async (_req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const validationError = validateProductInput(req.body ?? {});
    if (validationError) return res.status(400).json({ message: validationError });

    const { name, price, description = "", image } = req.body;
    const product = await Product.create({ name: name.trim(), price: Number(price), description, image });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const validationError = validateProductInput(req.body ?? {});
    if (validationError) return res.status(400).json({ message: validationError });

    const { name, price, description = "", image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: name.trim(), price: Number(price), description, image },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};
