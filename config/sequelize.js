require('dotenv').config();

// Parse DATABASE_URL properly
const databaseUrl = process.env.DATABASE_URL;

const config = {
  use_env_variable: 'DATABASE_URL',
  dialect: "postgres",
  dialectOptions: process.env.DB_SSL === 'true' ? {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  } : {},
  logging: false
};

module.exports = {
  development: config,
  test: config,
  production: config
}
