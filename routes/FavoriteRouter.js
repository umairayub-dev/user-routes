const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);

const {
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.get("/favorites", getFavoritesByUser);
router.post("/favorites/add", addFavorite);
router.delete("/favorites/delete/:id", deleteFavorite);

module.exports = router;
