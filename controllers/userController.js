const { login, signup, users, userModel } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ _id: id }, process.env.SECRET, { expiresIn: "3d" });
};
// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message, controler: "controler" });
  }
};
// signup user
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await signup(email, password);

    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userModel.findOne({ email });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findOne({ _id: id });
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  signupUser,
  getUsers,
  getUserByEmail,
  getUserById,
};
