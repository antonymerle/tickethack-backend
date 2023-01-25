var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");
const Trip = require("../models/trip");
const getISODate = require("../lib/library");
const moment = require("moment");
const { startSession } = require("../models/trip");

router.get("/", (req, res) => {
  Trip.find().then((trips) => res.json({ success: true, trips: trips }));
});

router.post("/search", (req, res) => {
  if (!req.body.departure || !req.body.arrival || !req.body.date) {
    return res.json({
      success: false,
      message: "Remplissez toutes les données du formulaire svp.",
    });
  }

  const request = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    dayStart: new Date(moment(req.body.date).startOf("day")),
    dayEnd: new Date(moment(req.body.date).endOf("day")),
  };

  // const resultList = data.filter(
  //   (trip) =>
  //     trip.departure.toLowerCase() === request.departure &&
  //     trip.arrival.toLowerCase() === request.arrival.toLowerCase() &&
  //     new Date(trip.date.$date).getFullYear() == request.date.getFullYear() &&
  //     new Date(trip.date.$date).getMonth() == request.date.getMonth() &&
  //     new Date(trip.date.$date).getDate() == request.date.getDate()
  // );

  Trip.find({
    date: {
      $gte: request.dayStart,
      $lte: request.dayEnd,
    },
  }).then((results) => {
    res.json({
      success: true,
      trips: results,
    });
  });
});

// TODO : pas utile à supprimer ?
router.delete("/trips", (req, res) => {
  Trip.deleteMany({}).then(() =>
    Trip.find().then((data) => {
      console.log(data);
      res.json({ allTrips: data });
    })
  );
});

module.exports = router;
