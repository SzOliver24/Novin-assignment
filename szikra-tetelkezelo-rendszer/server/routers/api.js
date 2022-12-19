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

// Customer endpoints
api.get("/customers", getCustomers);
api.get("/customer/:id", getCustomerById);
api.get("/customers/:userId", getCustomersByUserId);
api.post("/customer", addCustomer);
api.delete("/customer/:id", deleteCustomerById);

// export the routes
module.exports = api;
