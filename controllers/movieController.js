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

const addMovie = async (req, res) => {
  try {
    const {
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
      limit,
    } = req.body;

    // Check if a movie with the same imdb_code already exists
    const existingMovie = await movieModel.findOne({ imdb_code });
    if (existingMovie) {
      return res
        .status(400)
        .json({ error: "Movie with the same IMDb code already exists" });
    }
    const newMovie = new movieModel({
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
    });

    // Save the movie to the database
    await newMovie.save();

    const limitValue = parseInt(limit) || 20;
    const movies = await movieModel.find().limit(limitValue).select("-__v");

    const totalMoviesInDB = await movieModel.countDocuments();

    res.status(200).json({
      status: "ok",
      status_message: "Movie updated succesfully",
      data: {
        movie_count: totalMoviesInDB,
        movies,
      },
    });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ error: "An error occurred while adding the movie" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const { page, limit } = req.query;

    const deletedMovie = await movieModel.findOneAndDelete({ _id: id });

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }
    const limitValue = parseInt(limit) || 20;
    const pageValue = parseInt(page) || 1;
    const movies = await movieModel
      .find()
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue)
      .select("-__v");

    const totalMoviesInDB = await movieModel.countDocuments();

    res.status(200).json({
      status: "ok",
      status_message: "Movie deleted succesfully",
      data: {
        movie_count: totalMoviesInDB,
        movies,
      },
    });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the movie" });
  }
};

const updateMovie = async (req, res) => {
  const { movieId, movie, config } = req.body;

  try {
    if (!movieId || !movie)
      return res.status(400).json({ message: "Fields missing" });

    const updatedMovie = await movieModel.findByIdAndUpdate(movieId, movie);

    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    const limitValue = parseInt(config.limit) || 20;
    const pageValue = parseInt(config.page) || 1;
    const movies = await movieModel
      .find()
      .skip((pageValue - 1) * limitValue)
      .limit(limitValue)
      .select("-__v");

    const totalMoviesInDB = await movieModel.countDocuments();

    res.status(200).json({
      status: "ok",
      status_message: "Movie updated succesfully",
      data: {
        movie_count: totalMoviesInDB,
        movies,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update the movie", error: error.message });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  deleteMovie,
  updateMovie,
};
