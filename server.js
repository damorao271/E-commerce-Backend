require("dotenv").config();
require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");

// const winston = require("winston");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

require("./startup/routes")(app);
// winston.add(winston.transports.File, { filename: "logfile.log" });
// winston.add(winston.transports.MongoDB, {
//   db: "mongodb://localhost/ecommerce",
// });
// Puertos y URL
const uri = process.env.ATLAS_URI;
const localhost = process.env.LOCAL_HOST;
const PORT = process.env.PORT || 3000;

// Middleware

// Connetc to ATLAS
mongoose
  .connect(uri, {
    dbName: "e-commerce",
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas ..."))
  .catch((err) => console.error("Could not connect to MongoDB !!!"));

app.listen(PORT, console.log(`Listening on port ${PORT}`));
