const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

// serve static files
app.use(express.static("build"));

module.exports = app;
