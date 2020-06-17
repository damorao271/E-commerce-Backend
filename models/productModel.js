const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    description: { type: String, required: true },
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
    gender: Joi.string().required().lowercase(),
    quantity: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required().lowercase(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

module.exports.Product = Product;
module.exports.validate = validateProduct;
