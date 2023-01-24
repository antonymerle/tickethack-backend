let cart = [
  {
    departure: "Paris",
    arrival: "Bayonne",
    date: { $date: new Date("2023-01-29T00:00:00.000Z") },
    price: 120,
  },
  {
    departure: "Paris",
    arrival: "Marseille",
    date: { $date: new Date("2023-01-28T00:00:00.000Z") },
    price: 89,
  },
];

// let cart = [];

module.exports = cart;
