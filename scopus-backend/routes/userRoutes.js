// filepath: /c:/Users/fupifigu/Videos/test_unesum/unesum-app-final/scopus-backend/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/users', userController.getAllUsers);

module.exports = router;