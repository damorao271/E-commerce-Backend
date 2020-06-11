const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    gender: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

function validateProduct(product) {
  const schema = {
    name: Joi.string().required(),
    type: Joi.string().required(),
    gender: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
