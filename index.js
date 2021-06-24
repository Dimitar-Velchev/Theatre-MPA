const express = require("express");
const { PORT } = require("./config");
const expressConfig = require("./config/express");
const dataBaseConfig = require("./config/database");
const routesConfig = require("./config/routes");

async function start() {
  const app = express();
  expressConfig(app);
  await dataBaseConfig(app);
  routesConfig(app);
  //app.get("/", (req, res) => res.send("Hello Mitko Server"));
  app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
}

start()
