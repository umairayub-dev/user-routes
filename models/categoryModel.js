const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_USER_IMAGE =
  "https://www.pngkey.com/png/full/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-category.png";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      default: DEFAULT_USER_IMAGE,
    },
  },
  { timestamps: true }
);
const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;