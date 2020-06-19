require("dotenv").config();
const jwt = require("jsonwebtoken");

const myToken = process.env.MYTOKEN;

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, myToken);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

module.exports.auth = auth;
