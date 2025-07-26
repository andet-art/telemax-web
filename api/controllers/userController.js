// controllers/userController.js
import db from '../db.js';

export const getActiveUserCount = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS count FROM users 
      WHERE last_active > NOW() - INTERVAL 10 MINUTE
    `);
    res.json({ activeUsers: rows[0].count });
  } catch (err) {
    console.error("Failed to fetch active user count", err);
    res.sendStatus(500);
  }
};


export const updateLastActive = async (req, res) => {
  try {
    const userId = req.user.id;
    await db.query("UPDATE users SET last_active = NOW() WHERE id = ?", [userId]);
    res.sendStatus(200);
  } catch (err) {
    console.error("Failed to update last_active", err);
    res.sendStatus(500);
  }
};

// Get profile of currently logged-in user
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.query(
      "SELECT id, name, email FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to get profile" });
  }
};

// ✅ Get all users (admin use)
export const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT id, email, role, first_name, last_name, phone, date_of_birth, country,
             shipping_address, billing_address, created_at, updated_at
      FROM users
    `);

    

    res.json(rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
