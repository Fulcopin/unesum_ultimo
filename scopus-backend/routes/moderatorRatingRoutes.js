const express = require('express');
const router = express.Router();
const moderatorController = require('../controllers/moderatorController');

// Obtener calificaciones por proyecto
router.get('/:projectId', moderatorController.getProjectRatings);
// Guardar calificación
router.post('/', moderatorController.submitRating);

module.exports = router;
