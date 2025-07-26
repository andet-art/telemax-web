import db from '../db.js';

// ✅ Admin: Get all orders with item details
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

// ✅ Create new order
export const createOrder = async (req, res) => {
  console.log("📥 Order payload:", req.body);
  console.log("👤 User from token:", req.user);

  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Invalid user" });

    const {
      full_name,
      email,
      phone,
      address,
      description, // description = notes
      items,
      total_price,
    } = req.body;

    if (!full_name || !email || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Missing required fields or empty items" });
    }

    // ✅ Insert into orders table
    let orderId;
    try {
      const [result] = await db.query(
        `INSERT INTO orders 
          (user_id, full_name, email, phone, address, notes, total_price, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', NOW())`,
        [userId, full_name, email, phone, address, description, total_price]
      );
      orderId = result.insertId;
    } catch (e) {
      console.error("❌ Order insert failed:", e.message);
      return res.status(500).json({ message: "Failed to insert order" });
    }

    // ✅ Insert order items
    try {
      const itemValues = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
      await db.query(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?`,
        [itemValues]
      );
    } catch (e) {
      console.error("❌ Order items insert failed:", e.message);
      return res.status(500).json({ message: "Failed to insert order items" });
    }

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (err) {
    console.error("❌ General error placing order:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get orders for the currently logged-in user (order history)
export const getUserOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const [orders] = await db.query(`
      SELECT id, full_name, email, total_price, status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
    `, [userId]);

    if (!orders.length) {
      return res.json([]);
    }

    const [items] = await db.query(`
      SELECT oi.*, p.name AS product_name
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id IN (?)
    `, [orders.map(o => o.id)]);

    const ordersWithItems = orders.map((order) => {
      const orderItems = items.filter(item => item.order_id === order.id);
      return { ...order, items: orderItems };
    });

    res.json(ordersWithItems);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
