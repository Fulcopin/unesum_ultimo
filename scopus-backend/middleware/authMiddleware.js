// filepath: /c:/Users/fupifigu/Videos/test_unesum/unesum-app-final/scopus-backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado: token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};


const auth = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};


const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Requiere rol de administrador' });
        }
        next();
    } catch (error) {
        console.error('Error al verificar el rol de administrador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (user.role !== 'moderador') { // Asegúrate de que el rol sea 'moderador'
            return res.status(403).json({ message: 'Requiere rol de moderador' });
        }
        next();
    } catch (error) {
        console.error('Error al verificar el rol de moderador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    authenticateJWT,
    isAdmin,
    isModerator,
    auth,
    
};