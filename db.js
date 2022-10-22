const { Sequelize } = require('sequelize')

module.exports = new Sequelize(
    process.env.DB_NAME || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '26092002artyr',
    {
        dialect: 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || 5432,
    }
)