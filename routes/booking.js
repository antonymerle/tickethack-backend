var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");

router.get("/", (req, res) => {
  res.json({ success: true, bookings });
});

router.post("/", (req, res) => {
  // console.log(data);

  // TODO : vérifier si prix est un nombre
  if (!cart || cart.length === 0) {
    return res.json({
      success: false,
      message: `Le panier est vide`,
    });
  }

  bookings = [...bookings, ...cart];
  cart = [];

  console.log("bookings mis à jour : ", bookings);

  console.log("cart mis à jour : ", cart);

  res.json({ success: true, bookings });
});

module.exports = router;
