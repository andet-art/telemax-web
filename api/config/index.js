// config/index.js
export default {
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host:     process.env.DB_HOST,
    user:     process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  cors: {
    origin: [
      'http://localhost:5173',      // Vite dev server
      'http://localhost:3000',      // (if you ever use CRA or another port)
      'http://209.38.231.125',      // droplet IP, no port for static files
      'http://209.38.231.125:5173', // if you proxy the React app via the droplet
    ],
    credentials: true,
  }
};
