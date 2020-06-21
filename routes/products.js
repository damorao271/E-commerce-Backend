const { Product, validate } = require("../models/productModel");
const express = require("express");
const validateObjectId = require("../middleware/validateObjectId");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", async (req, res) => {
  const product = await Product.find().sort("name");
  res.send(product);
});

// router.get("/:type", async (req, res) => {
//   const product = await Product.find({ type: req.params.type }).sort({
//     size: -1,
//   });
//   if (!product)
//     return res.status(404).send("The product with the given ID was not found.");

//   res.send(product);
// });

// router.get("/:type/:name", async (req, res) => {
//   const product = await Product.find({
//     name: req.params.name,
//     type: req.params.type,
//   }).sort({
//     size: -1,
//   });
//   if (!product)
//     return res.status(404).send("The product with the given ID was not found.");

//   res.send(product);
// });

// router.get("/:type/:name/:size", async (req, res) => {
//   const product = await Product.find({
//     name: req.params.name,
//     type: req.params.type,
//     size: req.params.size,
//   }).sort({
//     size: -1,
//   });
//   if (!product)
//     return res.status(404).send("The product with the given ID was not found.");

//   res.send(product);
// });

// Encontrar por ID

router.get("/:id", validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");
  if (!product)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(product);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(product);
});

router.get("/name/:id", validateObjectId, async (req, res) => {
  const product = await Product.findById(req.params.id).select("-__v");

  if (!product)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(product);
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
    description: req.body.description,
  });

  product = await product.save();

  res.send(product);
});

module.exports = router;
