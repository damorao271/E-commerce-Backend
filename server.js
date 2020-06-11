require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/users");
const products = require("./routes/products");
const typeList = require("./routes/typeList");
const transaction = require("./routes/transaction");

// Puertos y URL
const uri = process.env.ATLAS_URI;
const localhost = process.env.LOCAL_HOST;
const PORT = process.env.PORT || 3000;

// Routes

// Middleware
app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/products", products);
app.use("/typeList", typeList);
app.use("/transaction", transaction);

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
