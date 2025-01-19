// backend/routes/search.js
const express = require('express');
const router = express.Router();
const scieloController = require('../controllers/scieloController');
const crossRefController = require('../controllers/crossRefController');
const openAireController = require('../controllers/openAireController');
const coreController = require('../controllers/coreController');

// Rutas de búsqueda
router.get('/scielo', scieloController.searchScielo);
router.get('/crossref', crossRefController.searchCrossRef);
router.get('/openaire', openAireController.searchOpenAIRE);
router.get('/core', coreController.searchCORE);

module.exports = router;
