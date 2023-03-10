const jwt = require("jsonwebtoken");
const User = require("../models/user_model")

exports.isAuthenticatedUser = async (req, res, next) => {
    const token = req.cookies.Token;

    if (!token) {
        throw new Error("not verified")
    }

    const decodedData = jwt.verify(token, "my-32-character-ultra-secure-and-ultra-long-secret");
    req.user = await User.findById(decodedData._id);
    next();
};