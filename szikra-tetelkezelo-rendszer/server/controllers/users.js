import { PrismaClient } from "@prisma/client";
import { use } from "../routers/api";
const prisma = new PrismaClient();

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
      .json({ message: "Nem található felhasználó ezen a felhasználóneven" });
    return;
  }
  try {
    if (req.body.password == user.password) {
      const accessToken = createToken(user.id);
      res.status(201).json({ accessToken: accessToken });
    } else {
      res.status(405).json({ message: "A megadott jelszó helytelen" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  postLogin,
};
