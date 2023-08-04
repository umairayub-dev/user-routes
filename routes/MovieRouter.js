const express = require("express");

const router = express.Router();

const {
  getMovies,
  getMovieById,
  // getSuggestions
} = require("../controllers/movieController");

router.get("/movies", getMovies);

router.get("/movie_details", getMovieById);
// router.get("/movies_suggestions", getSuggestions);

module.exports = router;
