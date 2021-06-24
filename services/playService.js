const Play = require("../models/Play");

async function getAllPlays() {
  return await Play.find({}).lean();
}

async function getPlayById(id) {}

async function createPlay(playData) {
  const play = new Play(playData);

  await play.save();

  return play;
}

async function editPlay(id, playData) {}

async function deletePlay(id) {}

module.exports = {
  deletePlay,
  editPlay,
  createPlay,
  getPlayById,
  getAllPlays,
};