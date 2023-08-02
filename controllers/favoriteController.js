const favoriteModel = require("../models/favoriteModel");
const mongoose = require('mongoose')

const getFavoritesByUser = async (req, res) => {
  const user_id = req.user._id;
  const favorites = await favoriteModel
    .find({ user_id })
    .sort({ createdAt: -1 });
  res.status(200).json(favorites);
};

const addFavorite = async (req, res) => {
  const {
    _id,
    imdb_code,
    title,
    slug,
    year,
    rating,
    runtime,
    genres,
    synopsis,
    yt_trailer_code,
    language,
    background_image,
    background_image_original,
    small_cover_image,
    medium_cover_image,
    large_cover_image,
    date_added,
  } = req.body;

  try {
    const user_id = req.user._id;
    const favorite = await favoriteModel.create({
      _id,
      imdb_code,
      title,
      slug,
      year,
      rating,
      runtime,
      genres,
      synopsis,
      yt_trailer_code,
      language,
      background_image,
      background_image_original,
      small_cover_image,
      medium_cover_image,
      large_cover_image,
      date_added,
      user_id,
    });
    const favorites = await favoriteModel
      .find({ user_id })
      .sort({ createdAt: -1 });

    res.status(200).json({ totalFavorites: favorite.length, favorites });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such favorite" });
    }

    const favorite = await favoriteModel.findOneAndDelete({ _id: id });

    if (!favorite) {
      return res.status(400).json({ error: "No such favorite" });
    }

    const user_id = req.user._id;
    const favorites = await favoriteModel
      .find({ user_id })
      .sort({ createdAt: -1 });
    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
module.exports = {
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
};
