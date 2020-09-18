const router = require("express").Router();
const bcrypt = require("bcryptjs"); // need this for hashing
const Users = require("../users/user-model");

const newToken = require("./addToken");
const makeJwt = require("./addToken");

router.post("/register", (req, res) => {
  const user = req.body;
  const isValid = validateUser(user);
  if (isValid.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
      .then((newUser) => {
        const token = newToken(newUser);
        res.status(201).json({ data: newUser, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({ message: "invalid info" });
  }
  // implement registration
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = newToken(user);
        res.status(200).json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(401).json({ message: "Credentials not valid" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
