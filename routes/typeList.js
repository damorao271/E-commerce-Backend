const { TypeList, validate } = require("../models/typeListModel");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const list = await TypeList.find().sort("name");
  res.send(list);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // let verify = await User.findOne({ email: req.body.email });
  // if (verify) return res.status(400).send("User already registered");

  let list = new TypeList({
    type: req.body.type,
  });

  list = await list.save();

  res.send(list);
});

module.exports = router;
