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
});

router.post("/search", (req, res) => {
  const request = {
    departure: req.body.departure.toLowerCase(),
    arrival: req.body.arrival.toLowerCase(),
    date: req.body.$date,
  };

  const resultList = data.filter(
    (trip) =>
      trip.departure.toLowerCase() === request.departure &&
      trip.arrival.toLowerCase() === request.arrival.toLowerCase()
  );

  res.json({ trips: resultList });

  console.log(newTrip);

  // newTrip.save().then(() => {
  //   Trip.find().then((data) => {
  //     console.log(data);
  //     res.json({ allTrips: data });
  //   });
  // });
});

router.delete("/trips", (req, res) => {
  Trip.deleteMany({}).then(() =>
    Trip.find().then((data) => {
      console.log(data);
      res.json({ allTrips: data });
    })
  );
});

// router.get("/lastTrip", (req, res) => {
//   Trip.find().then((data) => {
//     const lastTrip = data[data.length - 1];
//     console.log(lastTrip);

//     res.json({ lastTrip });
//   });
// });

module.exports = router;
