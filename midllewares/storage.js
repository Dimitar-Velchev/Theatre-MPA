const playService = require("../services/playService");

module.exports = () => (req, res, next) => {
  // to do change

  req.storage = {
    ...playService,
  };
  next();
};
