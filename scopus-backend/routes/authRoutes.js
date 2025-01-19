const express = require('express');
const authController = require('../controllers/authController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const moderatorController = require('../controllers/moderatorController');
const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', authController.createUser);
router.get('/user', authenticateJWT, (req, res) => {
    res.json({ id: req.user.id });
});
// Ruta para iniciar sesión
router.post('/login', authController.login);
router.get('/pdf/:filename', moderatorController.getDocument);
module.exports = router;
