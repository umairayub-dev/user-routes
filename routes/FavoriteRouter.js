const express = require("express");
const router = express.Router();
const {requireAuth} = require("../middleware/requireAuth");

const {
  getFavoritesByUser,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoriteController");

router.get("/favorites", requireAuth, getFavoritesByUser);
router.post("/favorites/add", requireAuth, addFavorite);
router.delete("/favorites/delete/:id", requireAuth, deleteFavorite);

module.exports = router;
