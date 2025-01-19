const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ResearchProject = require('./researchProject');
const Indicator = require('./Indicator');
const User = require('./User');

const ModeratorRating = sequelize.define('ModeratorRating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        references: {
            model: ResearchProject,
            key: 'id'
        }
    },
    indicatorId: {
        type: DataTypes.INTEGER,
        references: {
            model: Indicator,
            key: 'id'
        }
    },
    moderatorId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: 20
        }
    },
    comments: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'moderator_ratings',
    timestamps: false
});

module.exports = ModeratorRating;
