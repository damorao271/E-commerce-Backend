require("dotenv").config();
const { User } = require("../models/userModel");
const express = require("express");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const router = express.Router();
const _ = require("lodash");

const myToken = process.env.MYTOKEN;

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: user._id }, myToken);
  res.send(token);
});

function validate(req) {
  const schema = {
    email: Joi.string().max(50).email().required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
