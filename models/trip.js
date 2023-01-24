const mongoose = require("mongoose");

/*
{
  "departure":"Paris",
"arrival":"Lyon",
"date":{"$date":"2023-01-24T09:54:34.090Z"},
"price":129}

*/

// const dateSchema = mongoose.Schema({
//   date: Date,
// });

const tripSchema = mongoose.Schema({
  departure: String,
  arrival: String,
  date: { date: Date },
  price: Number,
});

const Trip = mongoose.model("trips", tripSchema);

module.exports = Trip;
