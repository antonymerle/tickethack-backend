var express = require("express");
var router = express.Router();
require("../models/connection");
const Booking = require("../models/booking");

// ROUTE PUT /purchase : achète les billets présents dans le panier (vue 2) OK FRONTEND
router.put("/", (req, res) => {
  // recherche par clé étrangère : "trip"
  Booking.updateMany({}, { purchased: true }).then((purchasedTrips) =>
    res.json({ success: true, purchased: purchasedTrips.modifiedCount })
  );
});

// ROUTE GET /purchase : afficher les billets achetés (vue 3) EN COURS FRONTEND
router.get("/", (req, res) => {
  // recherche par clé étrangère : "trip"
  Booking.find({ purchased: true })
    .populate("trip")
    .then((bookings) => res.json({ success: true, bookings }));
});

module.exports = router;
