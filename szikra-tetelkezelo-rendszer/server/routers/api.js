const express = require("express");
const api = express.Router();

api.use(express.json());

const {
  getCustomers,
  getCustomerById,
  getCustomersByUserId,
  addCustomer,
  deleteCustomerById,
} = require("../controllers/customers.js");

const {
  getItems,
  getItemById,
  getItemsByCustomerId,
  addItem,
  deleteItemById,
} = require("../controllers/items.js");

const { getUsers, postLogin } = require("../controllers/users.js");

// Customer endpoints
api.get("/customers", getCustomers);
api.get("/customer/:id", getCustomerById);
api.get("/customers/:userId", getCustomersByUserId);
api.post("/customer", addCustomer);
api.delete("/customer/:id", deleteCustomerById);

// Item endpoints
api.get("/items", getItems);
api.get("/item/:id", getItemById);
api.get("/items/:customerId", getItemsByCustomerId);
api.post("/item", addItem);
api.delete("/item/:id", deleteItemById);

// User endpoints
api.get("/users", getUsers);
api.post("/login", postLogin);

// export the routes
module.exports = api;
