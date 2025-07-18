const ResearchProject = require('./researchproject'); // Asegúrate de que el nombre del archivo sea correcto
const User = require('./User'); // Asegúrate de que el nombre del archivo sea correcto
const Indicator = require('./Indicator');
const ModeratorRating = require('./moderatorRating');

// Existing associations
ResearchProject.belongsTo(User, { as: 'creator', foreignKey: 'userId' });
ResearchProject.belongsToMany(User, {
    through: 'project_participants',
    foreignKey: 'project_id',
    as: 'participants'
});

User.belongsToMany(ResearchProject, {
    through: 'project_participants',
    foreignKey: 'user_id',
    as: 'projects'
});

// New associations
ModeratorRating.belongsTo(Indicator, {
    foreignKey: 'indicatorId',
    onDelete: 'CASCADE'
});

ModeratorRating.belongsTo(ResearchProject, {
    foreignKey: 'projectId',
    onDelete: 'CASCADE'
});

ModeratorRating.belongsTo(User, { foreignKey: 'moderatorId' });

Indicator.hasMany(ModeratorRating, {
    foreignKey: 'indicatorId'
});

ResearchProject.hasMany(ModeratorRating, {
    foreignKey: 'projectId'
});

ResearchProject.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    Indicator,
    ModeratorRating,
    ResearchProject,
    User
};



