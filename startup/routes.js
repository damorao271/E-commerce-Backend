const express = require("express");
const cors = require("cors");
const users = require("../routes/users");
const color = require("../routes/color");
const products = require("../routes/products");
const typeList = require("../routes/typeList");
const transaction = require("../routes/transaction");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/users", users);
  app.use("/color", color);
  app.use("/products", products);
  app.use("/typeList", typeList);
  app.use("/transaction", transaction);
  app.use(error);
};
