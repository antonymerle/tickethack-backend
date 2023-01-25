var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");
const Booking = require("../models/booking");
const Trip = require("../models/trip");

// ROUTE GET /purchase : afficher les billets achetés (vue 3)
router.get("/", (req, res) => {
  // recherche par clé étrangère : "trip"
  Booking.find({ purchased: true })
    .populate("trip")
    .then((bookings) => res.json({ success: true, bookings }));
});

// ROUTE PUT /purchase : achète les billets présents dans le panier (vue 2)
router.put("/", (req, res) => {
  // recherche par clé étrangère : "trip"
  Booking.updateMany({}, { purchased: true }).then((purchasedTrips) =>
    res.json({ success: true, purchased: purchasedTrips.modifiedCount })
  );
});

module.exports = router;
