const mongoose = require("mongoose");
const Joi = require("joi");

const typeListSchema = mongoose.Schema({
  type: { type: String, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
});

const TypeList = mongoose.model("TypeList", typeListSchema);

function validateTypeList(type) {
  const schema = {
    type: Joi.string().required(),
    gender: Joi.string().required(),
  };
  return Joi.validate(type, schema);
}

module.exports.TypeList = TypeList;
module.exports.validate = validateTypeList;
