const userService = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET, COOKIE_NAME } = require("../config");

module.exports = () => (req, res, next) => {
  if (parseToken(req, res)) {
    req.auth = {
      async register(username, password) {
        const token = await register(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      async login(username, password) {
        const token = await login(username, password);
        res.cookie(COOKIE_NAME, token);
      },
      logout() {
        res.clearCookie(COOKIE_NAME);
      },
    };
    next();
  }
};

async function register(username, password) {
  const existingUser = await userService.getUserByUsername(username);
  if (existingUser) {
    throw new Error("Username is taken");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userService.createUser(username, hashedPassword);

  return generateToken(user);
}

async function login(username, password) {
  const user = await userService.getUserByUsername(username);

  if (!user) {
    throw new Error("No such user");
  }

  const hasMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!hasMatch) {
    throw new Error("Incorrect pasword");
  }

  return generateToken(user);
}

function generateToken(userData) {
  const token = jwt.sign(
    {
      _id: userData._id,
      username: userData.username,
    },
    TOKEN_SECRET
  );
  return token;
}

function parseToken(req, res) {
  const token = req.cookies[COOKIE_NAME];
  if (token) {
    try {
      const userData = jwt.verify(token, TOKEN_SECRET);
      req.user = userData;
      res.locals.user = userData; //to add to skeleton
      return true;
    } catch (err) {
      res.clearCookie(COOKIE_NAME);
      res.redirect("/auth/login");
      return false;
    }
  }
  return true;
}
