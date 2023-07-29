const Brand = require("../models/brandModel");

const createBrand = async (req, res) => {
  const { name, description, brandImage } = req.body;
  if (!name || !description) {
    res.status(400).json({ error: "All fields are required" });
  }

  const brand = new Brand({ name, description, brandImage });
  brand
    .save()
    .then((savedBrand) => {
      res.status(201).json(savedBrand);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};
const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ brands });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBrandByName = async (req, res) => {
  const { name } = req.params;
  try {
    const brand = await Brand.findOne({ name });
    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const brand = await Brand.findById(id);
    res.status(200).json({ brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBrand = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      res.status(404).json({ message: "Brand not found" });
    }
    res
      .status(200)
      .json({ messsage: "Brand Deleted Successfully", Brand: deletedBrand });
  } catch (error) {
    res.status(500).json({ error: error, msg: error.message });
  }
};

const updateBrand = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedBrand) {
      res.status(404).json({ message: "Brand not found" });
    }
    res
      .status(200)
      .json({ message: "Brand updated successfully", Brand: updatedBrand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createBrand,
  getBrands,
  getBrandById,
  getBrandByName,
  updateBrand,
  deleteBrand,
};
