const ModeratorRating = require('../models/moderatorRating');

// Crear una nueva calificación
exports.createRating = async (req, res) => {
    try {
        const rating = await ModeratorRating.bulkCreate(req.body);
        res.status(201).json(rating);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
