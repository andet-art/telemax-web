// orderController.js
import db from '../db.js';

export const getAllOrdersWithItems = async (req, res) => {
  try {
    // Fetch orders with user email
    const [orders] = await db.query(`
      SELECT o.*, u.email AS user_email 
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `);

    // Fetch all order items with product name
    const [items] = await db.query(`
      SELECT oi.*, p.name AS product_name 
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
    `);

    // Group items under each order
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
