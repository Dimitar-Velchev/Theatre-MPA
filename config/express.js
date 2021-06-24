const express = require("express");
const hbs = require("express-handlebars");
const cookieParser = require("cookie-parser");
const authMidleware = require("../midllewares/auth");
const storageMidlleware = require("../midllewares/storage");

module.exports = (app) => {
  app.engine("hbs", hbs({ extname: ".hbs" }));
  app.set("view engine", "hbs");

  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(authMidleware());
  app.use(storageMidlleware());
};
