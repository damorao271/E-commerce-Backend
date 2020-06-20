const { User, validate } = require("../models/userModel");
const { auth } = require("../middleware/authMiddleware");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  res.send(user);
});

router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "lastname", "email"]));
});

module.exports = router;
