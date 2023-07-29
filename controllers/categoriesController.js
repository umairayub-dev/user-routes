const Category = require("../models/categoryModel.js");

const createCategory = async (req, res) => {
  const { name, description, categoryImage } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: "All fields are required" });
  }

  const category = new Category({ name, description, categoryImage });
  category
    .save()
    .then((savedCategory) => {
      res.status(201).json(savedCategory);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getCategoryByName = async (req, res) => {
  const { name } = req.params;
  try {
    const category = await Category.findOne({ name });
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.status(200).json({ category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json({
      messsage: "Categories Deleted Successfully",
      Categories: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error, msg: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedCategory) {
      res.status(404).json({ message: "Categories not found" });
    }
    res.status(200).json({
      message: "Categories updated successfully",
      Categories: updatedCategory,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  getCategoryByName,
  updateCategory,
  deleteCategory,
};
