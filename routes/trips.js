var express = require("express");
var router = express.Router();

var data = require("../trips.json");

/*
{
  "departure":"Paris",
"arrival":"Lyon",
"date":{"$date":"2023-01-24T09:54:34.090Z"},
"price":129}

*/

router.get("/", (req, res) => {
  console.log(data);
  res.json({ trips: data });
  // res.send("ca marche encore mieux !");
  // Trip.find().then((data) => res.json({ allTrips: data }));
});

// router.get("/lastTrip", (req, res) => {
//   Trip.find().then((data) => {
//     const lastTrip = data[data.length - 1];
//     console.log(lastTrip);

//     res.json({ lastTrip });
//   });
// });

router.post("/trips", (req, res) => {
  const newTrip = new Trip({
    departure: req.body.departure,
    arrival: req.body.arrival,
  });
  newTrip.save().then(() => {
    Trip.find().then((data) => {
      console.log(data);
      res.json({ allTrips: data });
    });
  });
});

router.delete("/trips", (req, res) => {
  Trip.deleteMany({}).then(() =>
    Trip.find().then((data) => {
      console.log(data);
      res.json({ allTrips: data });
    })
  );
});

module.exports = router;
