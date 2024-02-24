const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    email: String,
    name: String,
    categoryID: { type: mongoose.Schema.Types.ObjectId },
    brandID: { type: mongoose.Schema.Types.ObjectId },
    details: String,
    image: String,
  },
  { versionKey: false, timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
