const db = require("../config/db");

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

module.exports = { getProfile };
