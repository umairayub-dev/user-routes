const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DEFAULT_USER_IMAGE =
  "https://www.pngkey.com/png/full/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-brand.png";

const brandSchema = new Schema(
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
    brandImage: {
      type: String,
      default: DEFAULT_USER_IMAGE,
    },
  },
  { timestamps: true }
);
const BrandModel = mongoose.model("Brand", brandSchema);

module.exports = BrandModel;