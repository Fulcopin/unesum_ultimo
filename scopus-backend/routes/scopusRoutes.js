const express = require('express');
const multer = require('multer');
const scopusController = require('../controllers/scopusController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Define la ruta y verifica que esté correcta
router.post('/check-scopus', upload.single('pdf'), scopusController.checkScopus);

module.exports = router;
