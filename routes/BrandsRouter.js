const express = require("express");

const router = express.Router();

const {
  createBrand,
  getBrands,
  getBrandByName,
  getBrandById,
  deleteBrand,
  updateBrand,
} = require("../controllers/brandController.js");

router.post("/brands/create", createBrand);

router.get("/brands", getBrands);

router.get("/brands/name/:name", getBrandByName);

router.get("/brands/id/:id", getBrandById);

router.delete("/brands/id/:id", deleteBrand);

router.patch("/brands/id/:id", updateBrand);

module.exports = router;
