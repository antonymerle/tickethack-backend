var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
var tripsRouter = require("./routes/trips");
// var bookingRouter = require("./routes/booking");
var cartRouter = require("./routes/cart");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);

app.get("/", (req, res) => {
  res.json({ message: "bienvenue sur le backend tickethack" });
});
// app.use("/users", usersRouter);
app.use("/trips", tripsRouter);
// app.use("/booking", bookingRouter);
app.use("/cart", cartRouter);

module.exports = app;
