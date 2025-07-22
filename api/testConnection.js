// testConnection.js
import dotenv from 'dotenv';
import { db } from './db.js';

// Load .env
dotenv.config();

async function test() {
  try {
    // simple query
    const [rows] = await db.query('SELECT 1 AS ok');
    console.log('✅  Database connection successful:', rows);
  } catch (err) {
    console.error('❌  Database connection failed:', err);
  } finally {
    // close pool and exit
    await db.end();
    process.exit();
  }
}

test();
