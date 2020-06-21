const mongoose = require("mongoose");
const Joi = require("joi");

const cartSchema = mongoose.Schema({
  user: { type: String, required: true, trim: true },
  productId: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  size: { type: String, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
});

const Cart = mongoose.model("Cart", cartSchema);

function validateCart(cart) {
  const schema = {
    user: Joi.string().required(),
    name: Joi.string().required(),
    productId: Joi.string().required(),
    type: Joi.string().required(),
    gender: Joi.string().required().lowercase(),
    quantity: Joi.number().required(),
    color: Joi.string().required(),
    size: Joi.string().required().lowercase(),
    price: Joi.number().required(),
  };
  return Joi.validate(cart, schema);
}

module.exports.Cart = Cart;
module.exports.validate = validateCart;
