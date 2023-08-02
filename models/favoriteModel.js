const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    _id: { type: String, unique: false },
    user_id: { type: String, required: true },
    imdb_code: { type: String, required: true },
    title: { type: String, required: true, index: true },
    slug: { type: String, required: true },
    year: { type: Number, required: true, index: true },
    rating: { type: Number, required: true, min: 0, max: 10, index: true },
    runtime: { type: Number, required: true },
    genres: { type: [String], required: true, index: true },
    synopsis: { type: String, required: true },
    yt_trailer_code: { type: String, required: true },
    language: { type: String, required: true },
    background_image: { type: String, required: true },
    background_image_original: { type: String, required: true },
    small_cover_image: { type: String, required: true },
    medium_cover_image: { type: String, required: true },
    large_cover_image: { type: String, required: true },
    date_added: { type: Date, default: Date.now, index: true },
  },
  { timestamps: true, versionKey: false }
);

// Create indexes for fields used in filtering, sorting, and searching
favoriteSchema.index({
  title: "text",
});

const favoriteModel = mongoose.model("Favorites", favoriteSchema);
module.exports = favoriteModel;
