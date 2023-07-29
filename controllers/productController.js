const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  const { name, description, price, category, brand, thumbnail, imageArray } =
    req.body;
  if (!name || !description) {
    res.status(400).json({ error: "All fields are required" });
  }

  const product = new Product({
    name,
    description,
    price,
    category,
    brand,
    thumbnail,
    imageArray,
  });
  product
    .save()
    .then((savedProduct) => {
      res.status(201).json(savedProduct);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductsByBrand = async (req, res) => {
  const { brand } = req.params;
  try {
    const products = await Product.find({ brand });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      messsage: "Product Deleted Successfully",
      Product: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      message: "Product updated successfully",
      Product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductsByBrand,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
};
