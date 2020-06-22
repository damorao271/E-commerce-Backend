const { Cart, validate } = require("../models/cartModel");
const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

router.get("/", async (req, res) => {
  const cart = await Cart.find().sort("name");
  res.send(cart);
});

// router.get("/:type", async (req, res) => {
//   const cart = await cart.find({ type: req.params.type }).sort({
//     size: -1,
//   });
//   if (!cart)
//     return res.status(404).send("The cart with the given ID was not found.");

//   res.send(cart);
// });

// router.get("/:type/:name", async (req, res) => {
//   const cart = await cart.find({
//     name: req.params.name,
//     type: req.params.type,
//   }).sort({
//     size: -1,
//   });
//   if (!cart)
//     return res.status(404).send("The cart with the given ID was not found.");

//   res.send(cart);
// });

// router.get("/:type/:name/:size", async (req, res) => {
//   const cart = await cart.find({
//     name: req.params.name,
//     type: req.params.type,
//     size: req.params.size,
//   }).sort({
//     size: -1,
//   });
//   if (!cart)
//     return res.status(404).send("The cart with the given ID was not found.");

//   res.send(cart);
// });

// Encontrar por ID

router.get("/:user", async (req, res) => {
  const cart = await Cart.find({ user: req.params.user });
  if (!cart) return res.status(404).send("The user was not found.");

  res.send(cart);
});

router.get("/:user/:productId", async (req, res) => {
  const cart = await Cart.find({
    user: req.params.user,
    productId: req.params.productId,
  });
  if (!cart)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(cart);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      user: req.body.user,
      productId: req.body.productId,
      name: req.body.name,
      type: req.body.type,
      gender: req.body.gender,
      quantity: req.body.quantity,
      color: req.body.color,
      size: req.body.size,
      price: req.body.price,
    },
    { new: true }
  );

  if (!cart) return res.status(400).send("Invalid Product");

  res.send(cart);
});

router.delete("/:id", async (req, res) => {
  const cart = await Cart.findByIdAndRemove(req.params.id);
  if (!cart)
    return res.status(404).send("The product with the given ID was not found.");

  res.send(cart);
});

// router.get("/name/:id", validateObjectId, async (req, res) => {
//   const cart = await Cart.findById(req.params.id).select("-__v");

//   if (!cart)
//     return res.status(404).send("The product with the given ID was not found.");

//   res.send(cart);
// });

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  let cart = new Cart({
    user: req.body.user,
    productId: req.body.productId,
    name: req.body.name,
    type: req.body.type,
    gender: req.body.gender,
    quantity: req.body.quantity,
    color: req.body.color,
    size: req.body.size,
    price: req.body.price,
  });

  cart = await cart.save();

  res.send(cart);
});

module.exports = router;
