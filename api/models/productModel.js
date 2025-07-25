import db  from '../db.js';

export async function getAllProducts() {
  const [rows] = await db.query('SELECT * FROM products');
  return rows;
}

export async function getProductById(id) {
  const [rows] = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );
  return rows[0];
}

export async function createProduct({ name, description, price, version, imageUrl }) {
  const [result] = await db.query(
    `INSERT INTO products
     (name, description, price, version, image_url)
     VALUES (?, ?, ?, ?, ?)`,
    [name, description, price, version, imageUrl]
  );
  return { id: result.insertId, name, description, price, version, imageUrl };
}