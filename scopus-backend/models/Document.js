const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ResearchProject = require('./researchProject');
const User = require('./User'); // Importar modelo User

const Document = sequelize.define('Document', {
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ResearchProject,
            key: 'id',
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    
}, {
    tableName: 'documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ResearchProject.hasMany(Document, { as: 'documents', foreignKey: 'projectId' });
Document.belongsTo(ResearchProject, { foreignKey: 'projectId' });

User.hasMany(Document, { as: 'documents', foreignKey: 'userId' });
Document.belongsTo(User, { foreignKey: 'userId' });

module.exports = Document;