const { Product, validate } = require("../models/productModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Product.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  let product = new Product({
    name: req.body.name,
    type: req.body.type,
    gender: req.body.gender,
    quantity: req.body.quantity,
    color: req.body.color,
    size: req.body.size,
    price: req.body.price,
  });

  product = await product.save();

  res.send(product);
});

module.exports = router;
