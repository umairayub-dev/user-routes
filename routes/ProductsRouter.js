const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductsByBrand,
  getProductsByCategory,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

router.post("/products/create", createProduct);
router.get("/products", getProducts);
router.get("/products/byBrand/:brand", getProductsByBrand);
router.get("/products/byCategory/:category", getProductsByCategory);
router.delete("/products/:id", deleteProduct);
router.patch("/products/:id", updateProduct);

module.exports = router;
