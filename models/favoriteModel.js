const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    movieId: { type: String, required: true },
    user_id: { type: String, required: true },
    imdb_code: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    year: { type: Number, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    runtime: { type: Number, required: true },
    genres: { type: [String], required: true },
    synopsis: { type: String, required: true },
    yt_trailer_code: { type: String, required: true },
    language: { type: String, required: true },
    background_image: { type: String, required: true },
    background_image_original: { type: String, required: true },
    small_cover_image: { type: String, required: true },
    medium_cover_image: { type: String, required: true },
    large_cover_image: { type: String, required: true },
    date_added: { type: Date, default: Date.now },
  },
  { timestamps: true, versionKey: false }
);

const favoriteModel = mongoose.model("Favorites", favoriteSchema);
module.exports = favoriteModel;
