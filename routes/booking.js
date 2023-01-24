var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");
const Booking = require("../models/booking");
const Trip = require("../models/trip");

router.get("/", (req, res) => {
  // recherche par clé étrangère : "trip"
  Booking.find()
    .populate("trip")
    .then((bookings) => res.json({ success: true, bookings }));
});

router.post("/", (req, res) => {
  if (!req.body.tripId) {
    return res.json({
      success: false,
      message: `Le panier est vide`,
    });
  }

  // recherche par clé étrangère (tripId) d'une autre collection (Trip)
  Trip.findById(req.body.tripId).then((trip) => {
    console.log(trip);

    // On lie notre document Booking à un document d'une collection étrangère (Trip)
    // grâce à la clé étrangère _id: req.body.tripId,
    const newBooking = new Booking({
      purchased: false,
      trip: {
        _id: req.body.tripId,
        departure: trip.departure,
        arrival: trip.arrival,
        date: { date: trip.date },
        price: trip.price,
      },
    });
    newBooking
      .save()
      .then(() =>
        Booking.find().then((bookings) => res.json({ success: true, bookings }))
      );
  });
});

router.delete("/", (req, res) => {
  Booking.deleteOne({ _id: req.body.id }).then((data) => {
    if (data.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });
});

module.exports = router;
