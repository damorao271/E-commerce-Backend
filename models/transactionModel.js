const mongoose = require("mongoose");
const Joi = require("joi");

const transactionSchema = mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0, trim: true },
    userId: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

function validateTransaction(product) {
  const schema = {
    amount: Joi.number().required().min(0),
    userId: Joi.string().required(),
  };
  return Joi.validate(product, schema);
}

module.exports.Transaction = Transaction;
module.exports.validate = validateTransaction;
