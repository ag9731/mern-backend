const express = require("express");
var cookieParser = require('cookie-parser');
const cors = require("cors");



const app = express();

const allowedOrigins = [
  "http://localhost:5173", 
  "https://mern-frontend-451y.vercel.app" 
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "CORS policy: This origin is not allowed";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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