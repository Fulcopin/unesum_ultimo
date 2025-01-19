const express = require('express');
const adminController = require('../controllers/adminController');
const userController = require('../controllers/userController');
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authenticateJWT);
router.use(isAdmin);

// Ruta para obtener todos los documentos
router.get('/documents', adminController.getAllDocuments);

// Ruta para registrar un nuevo usuario
router.post('/register', adminController.registerUser);

// Rutas para manejar usuarios
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;