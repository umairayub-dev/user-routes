const express = require("express");

const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoriesController.js");

router.post("/categories/create", createCategory);

router.get("/categories", getCategories);

router.get("/categories/name/:name", getCategoryByName);

router.get("/categories/id/:id", getCategoryById);

router.delete("/categories/id/:id", deleteCategory);

router.patch("/categories/id/:id", updateCategory);

module.exports = router;
