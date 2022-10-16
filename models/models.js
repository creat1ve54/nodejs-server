const sequelize = require('../db')
const { DataTypes } = require('sequelize')


const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    fileUrl: { type: DataTypes.STRING, defaultValue: '' },
    views: { type: DataTypes.DOUBLE, defaultValue: 0 },
},
    { timestamps: true }
)


module.exports = {
    Post
}