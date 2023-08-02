const express = require("express");

const router = express.Router();

const {
  getMovies,
  getMovieById,
  //   getSuggestions,
  //   getComments,
  //   getReviews,
  //   getParentalGuides,
} = require("../controllers/movieController");

router.get("/movies", getMovies);

router.get("/movie_details", getMovieById);
// router.get("/movies_suggestions", getSuggestions);
// router.get("/movies_comments", getComments);
// router.get("/movie_reviews", getReviews);

module.exports = router;
