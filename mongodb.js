const mongoose = require("mongoose");

const db = mongoose
  .connect("mongodb://127.0.0.1:27017/healthcare")
  .then(() => {
    console.log("MongoDB Connected Succesfully!");
  })
  .catch(() => {
    console.log("Failed to Connect!");
  });

module.exports = db;
