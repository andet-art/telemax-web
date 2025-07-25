const db = require("../config/db"); // Your DB connection
const jwt = require("jsonwebtoken");

exports.createOrder = async (req, res) => {
  const { items, full_name, email, phone, address, notes, total_price } = req.body;
  const userId = req.user.id;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in order" });
  }

  try {
    // Create the order
    const [result] = await db.promise().query(
      `INSERT INTO orders (user_id, total_price, full_name, email, phone, address, notes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, total_price, full_name, email, phone, address, notes]
    );

    const orderId = result.insertId;

    // Insert order items
    const values = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
    await db.promise().query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`,
      [values]
    );

    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

exports.getOrdersByAdmin = async (req, res) => {
  try {
    const [orders] = await db.promise().query(`
      SELECT o.*, u.email AS user_email FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
