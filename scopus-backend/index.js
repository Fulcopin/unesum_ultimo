require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const scopusRoutes = require('./routes/scopusRoutes');
const authRoutes = require('./routes/authRoutes');
const researchProjectRoutes = require('./routes/researchProjectRoutes');
const bookRoutes = require('./routes/bookRoutes');
const searchRoutes = require('./routes/search');
const sequelize = require('./config/db');
const ResearchProject = require('./models/researchProject');
const User = require('./models/User');
const userRoutes = require('./routes/userRoutes');
const moderatorRoutes = require('./routes/moderatorRoutes');
const indicatorRoutes = require('./routes/indicatorRoutes');
const moderatorRatingRoutes = require('./routes/moderatorRatingRoutes');
const morgan = require('morgan'); 

// Importar el router del moderador
 // Asegúrate de que la ruta sea correcta

// Importar asociaciones
require('./models/associations');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/indicators', indicatorRoutes);
app.use('/api/moderator/ratings', moderatorRatingRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        success: false, 
        message: 'Something broke!',
        error: err.message
    });
});

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas API
app.use('/api/search', searchRoutes);
app.use('/api', researchProjectRoutes);
app.use('/api/auth', authRoutes); // Rutas de autenticación
app.use('/api', scopusRoutes);
app.use('/api/books', bookRoutes);
app.use('/api', userRoutes);
app.use('/api', moderatorRoutes);

// Manejo de errores 404
app.use((req, res, next) => {
    console.log('404 - Ruta no encontrada:', req.method, req.url);
    res.status(404).json({
        message: 'Ruta no encontrada',
        method: req.method,
        url: req.url
    });
});

// Asegúrate de que las asociaciones se carguen después de los modelos
require('./models/associations');

// Sincronizar base de datos con manejo de errores mejorado
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de datos sincronizada correctamente');
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log('Conexión a la base de datos: OK');
        });
    })
    .catch(error => {
        console.error('Error al sincronizar la base de datos:', error);
        process.exit(1); // Terminar el proceso si hay error de conexión
    });

module.exports = {
    sequelize,
    ResearchProject,
    User
};