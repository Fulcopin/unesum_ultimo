// filepath: /c:/Users/fupifigu/Videos/test_unesum/unesum-app-final/scopus-backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');



const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'usuario', 'moderador'),
        allowNull: false,
        defaultValue: 'usuario',
    }
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;