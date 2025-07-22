// models/userModel.js
import { db } from '../db.js';

export async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function createUser({ name, email, passwordHash }) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );
  return { id: result.insertId, name, email };
}
