const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
};

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// get current user
const getCurrentUser = async (req, res) => {
  if (req.userId === null) {
    return res.status(200).json({ userId: null, role: "notLoggedIn" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.userId,
      },
    });

    if (user == null) {
      return res.status(400).json({ message: "cannot find user" });
    }

    res
      .status(200)
      .json({ userId: user.id, role: user.role, userName: user.userName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// log in user
const postLogin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      userName: req.body.userName,
    },
  });
  if (!user) {
    res
      .status(400)
      .json({ message: "Cannot find user with the given username" });
    return;
  }
  try {
    if (req.body.password == user.password) {
      const accessToken = createToken(user.id);
      res.status(201).json({ accessToken: accessToken });
    } else {
      res.status(405).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  getCurrentUser,
  postLogin,
};
