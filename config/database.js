const mongoose = require("mongoose");
const { DB_URL } = require("./index");



module.exports = (app) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (err) => {
      console.error("connection error:", err);
      reject(err);
    });
    db.once("open", function () {
      console.log("DataBase is runnig");
      resolve();
    });
  });
};
