const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    {
        user: process.env.DB_NAME || 'inter_13',
        database: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || '123456',
        dialect: 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
    }
)