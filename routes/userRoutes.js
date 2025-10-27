const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
const { authenticateToken } = require("../service/auth");
router.get("/user", authenticateToken, userController.me);

module.exports = router;
