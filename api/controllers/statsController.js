import db from '../db.js';

export const getActiveUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT email, last_active AS loginTime
      FROM users
      WHERE last_active > NOW() - INTERVAL 10 MINUTE
    `);
    res.json(rows); // ✅ Return array of users
  } catch (err) {
    console.error("Failed to fetch active users", err);
    res.sendStatus(500);
  }
};
