const express = require("express");

const app = express();
app.use(express.json())

const errorMiddleware = require("./middleware/error")

//  Route Import
const product = require("./routes/productRoute");
app.use("/api/v1", product)

// Error handling middleware
app.use(errorMiddleware)

module.exports = app;
