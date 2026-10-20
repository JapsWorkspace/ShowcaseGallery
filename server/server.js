import "dotenv/config";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "5mb" }));

app.get("/", (_req, res) => {
  res.json({ message: "ShowCase API is running!" });
});
app.get("/health", (_req, res) => {
  res.json({ status: "ok", database: "connected" });
});
app.use("/api/products", productRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  if (error?.type === "entity.too.large") {
    return res.status(413).json({ message: "Request is too large. Images must be no more than 1 MB." });
  }
  if (error?.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(error.errors).map((item) => item.message).join(". ") });
  }
  res.status(500).json({ message: "Unexpected server error" });
});

const start = async () => {
  try {
    await connectDB();
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

start();
