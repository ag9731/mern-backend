const express = require("express");
const { getAllUser, createUser, userLogin, logOutUser, sendMail, resetPassword } = require("../controller/userController");
const { protected } = require("../middleware/authMiddleware")
const router = express.Router();

// Routes
router.route("/showuser").get(getAllUser,protected);
router.route("/create").post(createUser);
router.route("/login").post(userLogin);
router.route("/logout").post(logOutUser);
router.route("/sendEmail").post(sendMail);
router.route("/reset-password/:token").post(resetPassword);

module.exports = router;