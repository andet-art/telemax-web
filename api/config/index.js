import dotenv from 'dotenv';
dotenv.config();

export default {
  port:     process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  cors: {
    origin: ['http://localhost:3000', 'http://209.38.231.125'],
    credentials: true,
  }
};
