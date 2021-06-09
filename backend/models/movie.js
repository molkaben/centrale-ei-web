const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  titre: { type: String},
  date: { type: String },
  description: { type: String },
});

const MovieModel = mongoose.model("MovieModel", MovieSchema, "movies");

module.exports = MovieModel;
