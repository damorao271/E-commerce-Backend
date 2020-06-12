const mongoose = require("mongoose");
const Joi = require("joi");

const colorSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
});

const Color = mongoose.model("Color", colorSchema);

function validateColor(product) {
  const schema = {
    name: Joi.string().required().lowercase(),
  };
  return Joi.validate(product, schema);
}

module.exports.Color = Color;
module.exports.validate = validateColor;
