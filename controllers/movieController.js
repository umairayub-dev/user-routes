const movieModel = require("../models/movieModel");

const getMovies = async (req, res) => {
  const {
    limit,
    page,
    quality,
    minimum_rating,
    query_term,
    genre,
    sort_by,
    order_by,
  } = req.query;

  // Convert limit and page to integers
  const limitValue = parseInt(limit) || 20;
  const pageValue = parseInt(page) || 1;

  // Prepare the filter object based on the provided parameters
  const filter = {};
  if (quality) filter.quality = quality;
  if (minimum_rating) filter.rating = { $gte: parseInt(minimum_rating) };
  if (genre) filter.genres = genre;
  if (query_term) {
    filter.$or = [
      { title: { $regex: query_term, $options: "i" } },
      { imdb_code: query_term },
    ];
  }

  try {
    const totalMoviesInDB = await movieModel.countDocuments(filter);

    const movies = await movieModel
      .find(filter)
      .sort({ [sort_by || "date_added"]: order_by === "desc" ? -1 : 1 })
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue)
      .select("-__v");

    res.status(200).json({
      status: "ok",
      status_message: "Query was succesful",
      data: {
        movie_count: totalMoviesInDB,
        limit: limitValue,
        page_number: pageValue,
        movies,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error.message });
  }
};

const getMovieById = async (req, res) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      error: "Id is missing",
    });
  }

  try {
    const movie = await movieModel.findById(id);
    if (movie) {
      res.status(200).json({
        status: "ok",
        status_message: "Query was succesful",
        data: {
          movie,
        },
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", errorMessage: error.message });
  }
};
module.exports = {
  getMovies,
  getMovieById,
};
