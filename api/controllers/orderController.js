// controllers/orderController.js
import db from '../db.js';

export const getAllOrdersWithItems = async (req, res) => {
  try {
    const [orders] = await db.query(`
      SELECT o.*, u.email AS user_email 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    const [items] = await db.query(`
      SELECT oi.*, p.name AS product_name 
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
    `);

    const ordersWithItems = orders.map((order) => {
      const orderItems = items.filter(item => item.order_id === order.id);
      return { ...order, items: orderItems };
    });

    res.json(ordersWithItems);
  } catch (err) {
    console.error("❌ Failed to fetch orders:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, email, address, items, total_price } = req.body;

    const [result] = await db.query(
      `INSERT INTO orders (user_id, full_name, email, address, total_price, status, created_at)
       VALUES (?, ?, ?, ?, ?, 'Pending', NOW())`,
      [userId, full_name, email, address, total_price]
    );

    const orderId = result.insertId;

    const itemValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
    await db.query(
      `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`,
      [itemValues]
    );

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    console.error("❌ Failed to place order:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
