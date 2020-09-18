const router = require("express").Router();
const bcrypt = require("bcryptjs"); // need this for hashing
const Users = require("../users/user-model");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  const user = req.body;
  const isValid = validateUser(user);
  if (isValid.isSuccessful === true) {
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    Users.add(user)
      .then((newUser) => {
        const token = makeJwt(newUser);
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
  const creds = req.body;
  const isValid = validateCredentials(creds);
  if (isValid) {
    Users.findBy({ username: creds.username })
      .then(([user]) => {
        if (user && bcrypt.compareSync(creds.password, user.password)) {
          const token = makeJwt(user);
          res.status(200).json({ message: `Welcome ${user.username}`, token });
        } else {
          res.status(401).json({ message: "Credentials not valid" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message: "invalid information",
    });
  }
});

function validateUser(user) {
  return user.username && user.password ? true : false;
}

function validateCredentials(creds) {
  return creds.username && creds.password ? true : false;
}

function makeJwt({ id, username }) {
  const payload = {
    username,
    subject: id,
  };
  const config = {
    jwtSecret: "This is the super secret you can ever be secure from",
  };
  const options = {
    expiresIN: "2h",
  };
  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = router;
