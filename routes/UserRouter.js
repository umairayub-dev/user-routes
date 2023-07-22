const express = require("express");

const router = express.Router();

const {
  loginUser,
  signupUser,
  getUsers,
  getUserByEmail,
  getUserById,
} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/users", getUsers);

router.get("/user/email/:email", getUserByEmail);

router.get("/user/id/:id", getUserById)

module.exports = router;
