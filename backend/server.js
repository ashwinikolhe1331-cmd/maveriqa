const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const productRoutes = require("./routes/productRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ================= UPLOADS =================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= MONGODB =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) =>
    console.log("MongoDB connection error:", err)
  );

// ================= PRODUCTS ROUTE =================
app.use("/api/products", productRoutes);

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Maveriqa Backend is Running 🚀");
});

// ================= SERVER =================
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});