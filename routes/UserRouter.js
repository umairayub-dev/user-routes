const { userVerification } = require("../middleware/verifyToken");
const express = require("express");
const router = express.Router();

const {
  loginUser,
  signupUser,
  getUsers,
  getUserByEmail,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");


router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/users", getUsers);

router.get("/user/email/:email", getUserByEmail);

router.get("/user/id/:id", getUserById);

router.delete("/user/id/:id", deleteUser);

router.patch("/user/id/:id", updateUser);

module.exports = router;
