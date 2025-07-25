export default {
  apps: [
    {
      name: 'telemax-api',
      script: './server.js',
      env: {
        NODE_ENV: 'production',
        PORT: 4000,
        DB_HOST: '127.0.0.1',
        DB_PORT: 3306,
        DB_USER: 'root',
        DB_PASSWORD: 'Neon@2025Server!',
        DB_NAME: 'telemax',
        JWT_SECRET: 'Ne1inHdBWTipGI4TBL_EfD4jRW2LStqdL9gzBb4PzWbqzYZenUu8l_BtOsqLNN13',
      }
    }
  ]
}
