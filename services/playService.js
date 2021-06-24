const Play = require("../models/Play");

async function getAllPlays() {
  return await Play.find({ public: true }).sort({ createdAt: -1 }).lean();
}

async function getPlayById(id) {
  return await Play.findById(id).lean()
}

async function createPlay(playData) {
  const pattern = new RegExp(`^${playData.title}$`, "i");
  const existingPlay = await Play.find({ title: { $regex: pattern } });

  if (existingPlay) {
    throw new Error("A play with this name exist");
  }

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
