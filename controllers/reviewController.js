const reviewModel = require("../models/reviewModel");
const mongoose = require("mongoose");

const getReviewsForMovie = async (req, res) => {
  const { movieId } = req.params;
  try {
    const reviews = await reviewModel.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createReview = async (req, res) => {
  const { movieId, rating, comment, username } = req.body;
  const user_id = req.user._id;

  try {
    if (!movieId || !rating || !comment || !username) {
      return res
        .status(400)
        .json({ message: "Invalid data. Missing required fields." });
    }
    const existingReview = await reviewModel.findOne({ user_id, movieId });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already left a review for this movie" });
    }

    await reviewModel.create({
      user_id,
      username,
      movieId,
      rating,
      comment,
    });
    const reviews = await reviewModel.find({ movieId }).sort({ createdAt: -1 });

    res.status(201).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(404).json({ error: "No such review" });
    }

    const review = await reviewModel.findById({ _id: reviewId });

    if (review.user_id.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized - cannot delete review" });
    }
    if (!review) {
      return res.status(404).json({ error: "No such review" });
    }

    await reviewModel.findByIdAndDelete(reviewId);

    const { movieId } = review;
    const reviews = await reviewModel.find({ movieId }).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateReview = async (req, res) => {
  const { reviewId } = req.params;

  try {
    const { rating, comment } = req.body;
    if (!rating || !comment)
      return res.status(400).json({ message: "fields missing" });
    const updatedReview = await reviewModel.findById(reviewId);

    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check if the user is the owner of the review
    if (updatedReview.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized - Cannot update review" });
    }

    // Update the review
    updatedReview.rating = rating;
    updatedReview.comment = comment;
    await updatedReview.save();

    const movieId = updatedReview.movieId;
    const reviews = await reviewModel.find({ movieId });
    res.status(200).json({ message: "Review updated successfully", reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the review", error: error.message });
  }
};
module.exports = {
  createReview,
  getReviewsForMovie,
  updateReview,
  deleteReview,
};
