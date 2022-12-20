const express = require("express");
const api = express.Router();
const jwt = require("jsonwebtoken");

api.use(express.json());

const validateJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (token !== "null") {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ message: "You have failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  } else {
    req.userId = null;
    next();
  }
};

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
  updateItem,
} = require("../controllers/items.js");

const {
  getUsers,
  getCurrentUser,
  postLogin,
} = require("../controllers/users.js");

// Customer endpoints
api.get("/customers", getCustomers);
api.get("/customer/:id", getCustomerById);
api.get("/customers/user", validateJWT, getCustomersByUserId);
api.post("/customer", validateJWT, addCustomer);
api.delete("/customer/:id", deleteCustomerById);

// Item endpoints
api.get("/items", getItems);
api.get("/item/:id", getItemById);
api.get("/items/:customerId", getItemsByCustomerId);
api.post("/item", addItem);
api.put("/item/edit", updateItem);
api.delete("/item/:id", deleteItemById);

// User endpoints
api.get("/users", getUsers);
api.get("/user", validateJWT, getCurrentUser);
api.post("/login", postLogin);

// export the routes
module.exports = api;
