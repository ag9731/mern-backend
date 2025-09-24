const express = require("express");
const { getAllProducts } = require("../controller/productController");
const router = express.Router();

// Routes
router.route("/products").get(getAllProducts);

module.exports = router;