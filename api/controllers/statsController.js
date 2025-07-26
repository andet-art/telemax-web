import db from '../db.js';

export const getActiveUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT email, last_active AS loginTime,
             (last_active > NOW() - INTERVAL 10 MINUTE) AS isActive
      FROM users
      WHERE last_active > NOW() - INTERVAL 2 DAY
      ORDER BY last_active DESC
    `);

    res.json(rows); // ✅ returns both active + recent logins
  } catch (err) {
    console.error("Failed to fetch active users", err);
    res.sendStatus(500);
  }
};
