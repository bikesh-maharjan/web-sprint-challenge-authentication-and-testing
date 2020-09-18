const restricted = require("../auth/authenticate-middleware");

const router = require("express").Router();

const Users = require("./user-model");
router.get("/users", restricted, (req, res) => {
  Users.get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
