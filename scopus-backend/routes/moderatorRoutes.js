const express = require('express');
const moderatorController = require('../controllers/moderatorController');
const { authenticateJWT, isModerator } = require('../middleware/authMiddleware');
const { auth } = require('../middleware/authMiddleware'); // Importar el middleware de autenticación
const router = express.Router();

//router.use(authenticateJWT);
//router.use(isModerator);

router.get('/documents/project/:projectId', moderatorController.getProjectDocuments);
router.get('/documents/:filename', moderatorController.getDocument); // Ruta para descargar el documento
router.get('/projects/user/:userId', moderatorController.getUserProjects); 



module.exports = router;