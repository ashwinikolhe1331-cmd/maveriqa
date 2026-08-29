const express = require("express");
const multer = require("multer");
const Product = require("../models/product");

const router = express.Router();

// Image upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// GET - सर्व products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST - नवीन product + image
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, model, price, display } = req.body;

    console.log("Received data:", req.body);

    if (!name || !model || !price) {
      return res.status(400).json({
        message: "Name, Model and Price are required",
      });
    }

    const product = new Product({
      name,
      model,
      price,
      display,
      image: req.file
        ? `/uploads/${req.file.filename}`
        : "",
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);

    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE - product delete
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;