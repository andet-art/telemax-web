const db = require("../config/db");

// Get profile of currently logged-in user
const getProfile = (req, res) => {
  const userId = req.user.id;

  const query = "SELECT id, name, email FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Failed to get profile" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(results[0]);
  });
};

// ✅ NEW: Get all users (admin only)
const getAllUsers = (req, res) => {
  const query = `
    SELECT id, email, role, first_name, last_name, phone, date_of_birth, country,
           shipping_address, billing_address, created_at, updated_at
    FROM users
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }

    res.json(results);
  });
};

module.exports = {
  getProfile,
  getAllUsers
};
