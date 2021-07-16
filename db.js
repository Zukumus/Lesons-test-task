const { Sequelize } = require('sequelize');
require('dotenv').config()

module.exports = new Sequelize(
    process.env.DB_NAME, //
    'postgres', // user name
    'user', // password
    {
        dialect: 'postgres',
        host: process.DB_HOST,
        port: process.DB_PORT,
    }
)