var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/connection");
const Trip = require("../models/trip");
const getISODate = require("../lib/library");
const moment = require("moment");
const { startSession } = require("../models/trip");

// vue 1

// ROUTE GET /trips : afficher TOUS les trajets présents dans la BDD
router.get("/", (req, res) => {
  Trip.find().then((trips) => res.json({ success: true, trips: trips }));
});

// ROUTE POST /trips/search : effectuer une recherce à partir des données du formulaire
// departure
// arrival
// date (une journée)
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

module.exports = router;
