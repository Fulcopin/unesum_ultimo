// models/ProjectImage.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const ResearchProject = require('./researchProject');

const ProjectImage = sequelize.define('ProjectImage', {
    path: {
        type: DataTypes.STRING,
        allowNull: false, // La ruta o URL de la imagen
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false, // El nombre del archivo
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ResearchProject,
            key: 'id',
        },
    },
}, {
    tableName: 'project_images',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

// Configurar la relación con el modelo `ResearchProject`
ResearchProject.hasMany(ProjectImage, { as: 'images', foreignKey: 'projectId' });
ProjectImage.belongsTo(ResearchProject, { foreignKey: 'projectId' });

module.exports = ProjectImage;
