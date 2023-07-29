const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const DEFAULT_USER_IMAGE =
  "https://www.pngkey.com/png/full/950-9501315_katie-notopoulos-katienotopoulos-i-write-about-tech-user.png";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userImage: {
    type: String,
    default: DEFAULT_USER_IMAGE,
  },
});
const userModel = mongoose.model("User", userSchema);

// static signup method
const signup = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const exists = await userModel.exists({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await userModel.create({ email, password: hash });

  return user;
};
// static login method
const login = async (email, password) => {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await userModel.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = {
  userModel,
  login,
  signup,
};