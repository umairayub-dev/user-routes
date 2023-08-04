const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcrypt");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3d" });
};
// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Invalid credentials",
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = createToken(user._id);

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        userImage: user.userImage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
// signup user
const signupUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(email);
  // validation
  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Bad Request, all fields are required",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: "Email is not valid",
    });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({
      error: "Password not strong enough",
    });
  }
  const emailExists = await User.findOne({ email });
  const usernameExists = await User.findOne({ username });

  if (emailExists) {
    return res.status(400).json({
      error: "Email already in use",
    });
  }
  if (usernameExists) {
    return res.status(400).json({
      error: "Username already in use",
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = createToken(user._id);
    return res.status(201).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        userImage: user.userImage,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ messsage: "User Deleted Successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error, msg: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  signupUser,
  getUsers,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
};
