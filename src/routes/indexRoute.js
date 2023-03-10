const express = require("express");
const { renderIndex } = require("../controllers/indexController")
const router = express.Router();


router.route("/").get(renderIndex);

module.exports = router;