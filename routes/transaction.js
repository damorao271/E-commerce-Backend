const { Transaction, validate } = require("../models/transactionModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const transaction = await Transaction.find().sort("name");
  res.send(transaction);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  let transaction = new Transaction({
    amount: req.body.amount,
    userId: req.body.userId,
  });

  transaction = await transaction.save();

  res.send(transaction);
});

module.exports = router;
