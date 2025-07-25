import bcrypt from 'bcrypt';

const adminPassword = 'Neon@2025Server!';

bcrypt.hash(adminPassword, 10).then((hash) => {
  console.log('✅ HASH:\n', hash);
});

