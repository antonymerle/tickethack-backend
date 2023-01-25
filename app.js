var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var tripsRouter = require("./routes/trips");
var cartRouter = require("./routes/cart");
var purchaseRouter = require("./routes/purchase");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.json({ message: "bienvenue sur le backend tickethack" });
});
app.use("/trips", tripsRouter);
app.use("/cart", cartRouter);
app.use("/purchase", purchaseRouter);

module.exports = app;
