const mongoose = require("mongoose");
require("dotenv").config();

const dbName = "tickethack";

const connectionString = `mongodb+srv://antony:${process.env.MONGO_DB_PASSWORD}@cluster0.sw1toe0.mongodb.net/${dbName}`;

mongoose
  .connect(connectionString, { connectTimeoutMS: 2000 })
  .then(() => console.log("Connecté à la base de données " + dbName))
  .catch((error) => console.log(error));
