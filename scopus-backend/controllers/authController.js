const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Controlador para el registro de usuarios
const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword, role });
        res.json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// Controlador para el inicio de sesión
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        // Buscar al usuario en la base de datos
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });

        // Generar el token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, role: user.role });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

module.exports = { createUser, login };
