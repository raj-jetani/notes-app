const express = require("express");
const { renderSignupForm, signup, renderSigninForm, signin, logout } = require("../controllers/authController");
const router = express.Router();

router.route("/signup").get(renderSignupForm);
router.route("/signup").post(signup);
router.route("/signin").get(renderSigninForm);
router.route("/signin").post(signin);
router.route("/logout").get(logout);

module.exports = router;