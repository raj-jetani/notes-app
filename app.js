require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override")
const app = express();
const session = require("express-session");
const flash = require("connect-flash");

require("./src/db/conn");

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session({
  secret: "FF4982CFFC1D3",
  cookie: { maxAge : 1000 },
  saveUninitialized: false,
  resave: false
}));

// app.use(function(req, res, next){
//   res.locals.message = req.flash();
//   next();
// });

app.use(flash())

app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "/src/views"));

// Route Import
const authRoute = require("./src/routes/authRoute");
const indexRoute = require("./src/routes/indexRoute");
const notesRoute = require("./src/routes/notesRoute");

app.use("/auth",authRoute);
app.use(indexRoute);
app.use("/notes", notesRoute);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
