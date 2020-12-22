// import dotenv from 'dotenv';
const dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config('../.env')
  if (result.error) {
    throw result.error
  } else {
    console.log("Environment variables file loaded")
  }
}

module.exports = {
  "development": {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
  PORT: process.env.PORT,
  DB: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false
  },
}
