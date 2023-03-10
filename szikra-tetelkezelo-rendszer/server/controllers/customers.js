const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get a customer by id
const getCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Cannot find customer" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all customers by userId
const getCustomersByUserId = async (req, res) => {
  const user_id = req.userId;
  if (!user_id) {
    res.sendStatus(403);
    return;
  }
  try {
    const customers = await prisma.customer.findMany({
      where: {
        userId: user_id,
      },
    });
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add a new customer
const addCustomer = async (req, res) => {
  if (!req.userId) {
    res.sendStatus(403);
  }
  const data = {
    name: req.body.name,
    userId: req.userId,
  };
  try {
    const customer = await prisma.customer.create({
      data,
    });
    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// delete customer by id
const deleteCustomerById = async (req, res) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: {
        id: req.params.id,
      },
    });
    if (!customer) {
      res.status(404).json({ message: "Cannot find customer" });
      return;
    }
    const removedCustomer = await prisma.customer.delete({
      where: {
        id: req.params.id,
      },
    });
    if (removedCustomer) {
      res.status(200).json({ message: "Customer deleted" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export the functions
module.exports = {
  getCustomers,
  getCustomerById,
  getCustomersByUserId,
  addCustomer,
  deleteCustomerById,
};
