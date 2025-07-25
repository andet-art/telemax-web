// models/userModel.js
import  db  from '../db.js';

export async function findUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function getUserById(id) {
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
}

export async function createUser({
  email,
  passwordHash,
  role = 'user',
  first_name,
  last_name,
  phone,
  date_of_birth,
  country,
  shipping_address,
  billing_address,
  age_verified,
  terms_accepted,
  privacy_accepted,
  marketing_consent,
}) {
  const [result] = await db.query(
    `INSERT INTO users 
    (email, password, role, first_name, last_name, phone, date_of_birth, country, 
     shipping_address, billing_address, age_verified, terms_accepted, 
     privacy_accepted, marketing_consent)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      email,
      passwordHash,
      role,
      first_name,
      last_name,
      phone,
      date_of_birth,
      country,
      shipping_address,
      billing_address,
      age_verified,
      terms_accepted,
      privacy_accepted,
      marketing_consent,
    ]
  );

  return { id: result.insertId, email, first_name, last_name };
}