const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/requireAuth");

const {
  loginUser,
  signupUser,
  getProfile,
  deleteUser,
  updateUser,
  getUsers
} = require("../controllers/userController");

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/profile", requireAuth, getProfile);
router.get('/users', requireAuth, requireRole('admin'), getUsers)

router.patch("/profile", requireAuth, updateUser);
router.delete("/user/:id", requireAuth, requireRole('admin'), deleteUser);

module.exports = router;
