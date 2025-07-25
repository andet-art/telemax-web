const express = require("express");
const router = express.Router();
const { createOrder, getOrdersByAdmin } = require("../controllers/orderController");
const verifyToken = require("../middleware/verifyToken");

router.post("/", verifyToken, createOrder);
router.get("/admin", verifyToken, getOrdersByAdmin); // Optional: protect with isAdmin

module.exports = router;
