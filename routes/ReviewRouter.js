const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  createReview,
  getReviewsForMovie,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

router.get("/reviews/:movieId", getReviewsForMovie);
router.post("/reviews/create", requireAuth, createReview);
router.put("/reviews/:reviewId", requireAuth, updateReview);
router.delete("/reviews/:reviewId", requireAuth, deleteReview);

module.exports = router;
