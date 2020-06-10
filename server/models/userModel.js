const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 5, maxlength: 50 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(2).required(),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().min(5).max(50).required(),
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
