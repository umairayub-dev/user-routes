const express = require("express");
const router = express.Router();
const { requireAuth, requireRole } = require("../middleware/requireAuth");

const {
    countEverything
} = require("../controllers/dashboardController.js");


router.get('/dashboard', requireAuth, requireRole('admin'), countEverything)

module.exports = router;
