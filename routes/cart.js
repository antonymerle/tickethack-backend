var express = require("express");
var router = express.Router();
var cart = require("../data/cart");

/*
{
  "departure":"Paris",
"arrival":"Lyon",
"date":{"$date":"2023-01-24T09:54:34.090Z"},
"price":129}

*/

// let cart = [
//   {
//     departure: "Paris",
//     arrival: "Bayonne",
//     date: { $date: new Date("2023-01-29T00:00:00.000Z") },
//     price: 120,
//   },
//   {
//     departure: "Paris",
//     arrival: "Marseille",
//     date: { $date: new Date("2023-01-28T00:00:00.000Z") },
//     price: 89,
//   },
// ];

// let cart = [];

router.get("/", (req, res) => {
  // console.log(data);

  res.json({ success: true, cart });
});

router.post("/", (req, res) => {
  // console.log(data);

  // TODO : vérifier si prix est un nombre
  if (
    !req.body.departure ||
    !req.body.arrival ||
    !req.body.$date ||
    !req.body.price
  ) {
    return res.json({
      success: false,
      message: `Erreur dans la récupération du panier`,
    });
  }

  const request = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: { $date: new Date(req.body.$date) },
    price: parseInt(req.body.price),
  };

  cart.push(request);
  console.log(cart);

  res.json({ success: true, cart });
});

router.delete("/", (req, res) => {
  // console.log(data);

  // TODO : vérifier si prix est un nombre
  if (
    !req.body.departure ||
    !req.body.arrival ||
    !req.body.$date ||
    !req.body.price
  ) {
    return res.json({
      success: false,
      message: `Erreur dans la récupération du voyage à supprimer`,
    });
  }

  const request = {
    departure: req.body.departure.toLowerCase(),
    arrival: req.body.arrival.toLowerCase(),
    date: new Date(req.body.$date),
    price: parseInt(req.body.price),
  };

  // console.log("request object :", request);
  // console.log("cart : ", cart);

  console.log(
    `${new Date(
      cart[0].date.$date
    ).getFullYear()}  != ${request.date.getFullYear()}`
  );

  const resultList = cart.filter(
    (trip) =>
      trip.departure.toLowerCase() != request.departure.toLowerCase() ||
      trip.arrival.toLowerCase() != request.arrival.toLowerCase() ||
      new Date(trip.date.$date).getFullYear() != request.date.getFullYear() ||
      new Date(trip.date.$date).getMonth() != request.date.getMonth() ||
      new Date(trip.date.$date).getDate() != request.date.getDate() ||
      trip.price != request.price
  );

  console.log("resultList : ", resultList);

  cart = [...resultList];

  res.json({ success: true, cart });
});

module.exports = router;
// module.exports = cart;
