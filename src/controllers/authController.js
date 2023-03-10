const User = require("../models/user_model");
const bcrypt = require("bcryptjs");

// Render Signup Form
exports.renderSignupForm = (req, res) => {
  res.render("auth/signup", {
    message: req.flash("message"),
  });
};

// SignUp
exports.signup = async (req, res) => {
  try {
    if (req.body.password == req.body.cpassword) {
      if (
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
          req.body.password
        )
      ) {
        const registerUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        await registerUser.save();

        req.flash("message", "Thanks For Registration....Please Login");
        req.flash("status", "success");
        res.status(201).redirect("/auth/signin");
      } else {
        req.flash(
          "message",
          "password must be at least 8 characters including a lowercase letter, an uppercase letter, a symbol and a number"
        );
        res.status(201).redirect("/auth/signup");
      }
    } else {
      req.flash("message", "Passwords are not matching");
      res.status(201).redirect("/auth/signup");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

// Render Signin Form
exports.renderSigninForm = (req, res) => {
  res.render("auth/signin", {
    message: req.flash("message"),
    status: req.flash("status"),
  });
};

// SignIn
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const password = await bcrypt.compare(req.body.password, user.password);
    const token = await user.generateAuthToken();

    res.cookie("Token", token, {
      httpOnly: false,
    });

    if (password) {
      res.status(201).redirect("/notes");
    } else {
      req.flash("message", "Invalid Email or Password. Please try again.");
      req.flash("status", "danger");
      res.redirect("/auth/signin");
    }
  } catch (error) {
    req.flash("message", "Invalid Email or Password. Please try again.");
    req.flash("status", "danger");
    res.redirect("/auth/signin");
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("Token");

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
