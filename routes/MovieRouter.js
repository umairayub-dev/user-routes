const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/requireAuth");

const {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
} = require("../controllers/movieController");

router.post("/movies/add", requireAuth, requireRole("admin"), addMovie);
router.get("/movies", getMovies);
router.get("/movie_details", getMovieById);
router.patch("/update-movie", requireAuth, requireRole("admin"), updateMovie);
router.delete("/movies/delete/:id", requireAuth, requireRole("admin"), deleteMovie);

module.exports = router;
