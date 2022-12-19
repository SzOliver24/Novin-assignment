import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// get all items
const getItems = async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get an item by id
const getItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ message: "Tétel nem található" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all items by customerId
const getItemsByCustomerId = async (req, res) => {
  const customer_id = req.params.customerId;

  try {
    const items = prisma.item.findMany({
      where: {
        customerId: customer_id,
      },
    });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add a new item
const addItem = async (req, res) => {
  const data = {
    name: req.body.name,
    comment: req.body.comment,
    price: parseInt(req.body.price),
    status: req.body.status,
    customerId: req.body.customerId,
  };
  try {
    const item = await prisma.item.create({
      data,
    });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete item by id
const deleteItemById = async (req, res) => {
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!item) {
      res.status(404).json({ message: "Tétel nem található" });
      return;
    }
    const removedItem = await prisma.item.delete({
      where: {
        id: req.params.id,
      },
    });
    if (removedItem) {
      res.status(200).json({ message: "Tétel törölve" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export the functions
module.exports = {
  getItems,
  getItemById,
  getItemsByCustomerId,
  addItem,
  deleteItemById,
};
