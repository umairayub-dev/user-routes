const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");

const {
  loginUser,
  signupUser,
  getProfile,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/profile", requireAuth, getProfile);

router.patch("/profile", requireAuth, updateUser);

router.delete("/profile", requireAuth, deleteUser);

module.exports = router;
