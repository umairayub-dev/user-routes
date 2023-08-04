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

const getProfile = async (req, res) => {
  const user_id = req.user._id;
  try {
    const user = await User.findById(user_id).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const user_id = req.user._id;
  try {
    const deletedUser = await User.findByIdAndDelete(user_id);
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
  const { email } = req.body;
  const user_id = req.user._id;

  try {
    // Check if the new email is already used by another user

    const existingUser = await User.findOne({ email: email });
    if (existingUser && existingUser._id.toString() !== user_id) {
      return res.status(400).json({ message: "Email already in use" });
    }

    if(!validator.isEmail(email)){
      return res.status(400).json({ message: "Invalid email format" });
    }
    const updateData = { email: email };
    const updatedUser = await User.findByIdAndUpdate(user_id, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
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
  getProfile,
  deleteUser,
  updateUser,
};
