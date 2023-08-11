const userModel = require("../models/userModel");
const favoritesModel = require("../models/favoriteModel");
const reviewModel = require("../models/reviewModel");
const moviesModel = require("../models/movieModel");

const countEverything = async (req, res) => {
  try {
    const numFav = await favoritesModel.countDocuments();
    const numMov = await moviesModel.countDocuments();
    const numReview = await reviewModel.countDocuments();
    const numUsers = await userModel.countDocuments();

    return res.status(200).json({
      numFavorites: numFav,
      numReviews: numReview,
      numMovies: numMov,
      numUsers,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An Error occurred",
    });
  }
};

module.exports = {
  countEverything,
};
