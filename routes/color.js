const { Color, validate } = require("../models/colorModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await Color.find().sort("name");
  res.send(users);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  let color = new Color({
    name: req.body.name,
  });

  color = await color.save();

  res.send(color);
});

module.exports = router;
