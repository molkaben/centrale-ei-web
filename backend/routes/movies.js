const express = require("express");
const MovieModel = require("../models/movie");
const router = express.Router();
const routeCallback = function (req, res) {
  res.json([]);
};
router.get("/", function (req, res) {});
router.get("/movies", routeCallback);
router.post("/new", function (req, res) {
  const newMovie = new MovieModel({
    titre: req.body.titre,
    date: req.body.date,
    description: req.body.description,
  });
  newMovie
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `Movie with title "${newMovie.titre}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

module.exports = router;
