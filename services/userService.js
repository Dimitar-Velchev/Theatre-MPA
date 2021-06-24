const User = require("../models/User");

async function createUser(username, hashedPassword) {
  const user = new User({
    username,
    hashedPassword,
    //to change later
  });

  await user.save();
  return user;
}

async function getUserByUsername(username){
    const pattern = new RegExp(`^${username}$`, "i");
    const user = await User.findOne({
      username: { $regex: pattern },
    });
    return user;
}

// to add more functions

module.exports = {
    createUser,
    getUserByUsername
}