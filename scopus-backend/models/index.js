const sequelize = require('../config/db');
const ResearchProject = require('./researchProject');
const User = require('./User');

// Importar asociaciones
require('./associations');

// Sincronizar modelos con la base de datos
sequelize.sync({ alter: true })
    .then(() => {
        console.log('¡Base de datos y tablas creadas!');
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
    });

module.exports = {
    sequelize,
    ResearchProject,
    User
};