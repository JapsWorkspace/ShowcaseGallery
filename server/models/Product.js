import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [100, "Product name must be 100 characters or less"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Description must be 500 characters or less"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: (value) => /^data:image\/(png|jpe?g|webp);base64,/i.test(value),
        message: "Image must be a PNG, JPG, or WebP data URL",
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
