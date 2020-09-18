const axios = require("axios");

const Users = require("../users/user-model");

const restricted = require("../auth/authenticate-middleware");

const router = require("express").Router();

router.get("/", restricted, (req, res) => {
  const requestOptions = {
    headers: { accept: "application/json" },
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then((response) => {
      res.status(200).json(response.data.results);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
});

router.get("/user", restricted, (req, res) => {
  Users.find()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
