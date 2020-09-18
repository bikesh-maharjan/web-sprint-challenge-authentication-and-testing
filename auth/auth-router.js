const router = require("express").Router();
const bcrypt = require("bcryptjs"); // need this for hashing

const Users = require("../users/user-model");

const newToken = require("./addToken");

router.post("/register", (req, res) => {
  // implement registration
});

router.post("/login", (req, res) => {
  // implement login
});

module.exports = router;
