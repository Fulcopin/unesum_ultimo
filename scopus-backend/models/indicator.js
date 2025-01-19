const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Indicator = sequelize.define('Indicator', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    weight: {
        type: DataTypes.INTEGER,
        defaultValue: 20
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'indicators',
    timestamps: false
});

module.exports = Indicator;
