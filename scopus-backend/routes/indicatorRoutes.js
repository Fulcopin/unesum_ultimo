const express = require('express');
const router = express.Router();
const indicatorController = require('../controllers/indicatorController');

// Rutas públicas
router.get('/', indicatorController.getAllIndicators);

// Rutas protegidas
router.get('/project/:projectId', indicatorController.getIndicatorsByProject);
router.post('/score', indicatorController.scoreIndicator);
router.put('/score/:id', indicatorController.updateScore);
router.post('/update-score', indicatorController.updateScore); // Agregar esta línea

module.exports = router;
