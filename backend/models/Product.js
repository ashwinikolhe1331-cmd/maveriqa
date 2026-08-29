const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    display: {
      type: String,
      default: "",
    },

    price: {
      type: String,
      required: true,
    },

    specs: [
      {
        label: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);