const express = require("express");
var cookieParser = require('cookie-parser');
const cors = require("cors");



const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));


app.use(express.json());
app.use(cookieParser());
// const product = require("./routes/productRoutes");
const products = require("./routes/productRoutes");
const user = require("./routes/userRoutes");

app.use("/api/v1", user);
app.use("/api/v1", products);

module.exports = app;