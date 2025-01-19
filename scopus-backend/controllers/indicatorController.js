const Indicator = require('../models/Indicator');
const ModeratorRating = require('../models/moderatorRating');

// Obtener todos los indicadores
exports.getAllIndicators = async (req, res) => {
    try {
        const indicators = await Indicator.findAll();
        res.status(200).json(indicators);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Calificar todos los indicadores
exports.rateAllIndicators = async (req, res) => {
    try {
        const { rating } = req.body;
        const indicators = await Indicator.findAll();
        for (let indicator of indicators) {
            indicator.rating = rating;
            await indicator.save();
        }
        res.status(200).json({ message: 'All indicators rated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Calificar un proyecto específico
exports.rateProject = async (req, res) => {
    try {
        const { projectId, score } = req.body;
        const project = await Indicator.findByPk(projectId);
        
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }

        project.rating = score;
        await project.save();
        
        res.status(200).json({ 
            message: 'Project rated successfully',
            project: project 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getIndicatorsByProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const indicators = await Indicator.findAll({
            include: [{
                model: ModeratorRating,
                where: { projectId },
                required: false,
                attributes: ['id', 'score', 'comments', 'moderatorId']
            }]
        });

        res.status(200).json({
            success: true,
            data: indicators
        });
    } catch (error) {
        console.error('Error en getIndicatorsByProject:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

// Modificar el método scoreIndicator existente
exports.scoreIndicator = async (req, res) => {
    try {
        const { projectId, indicatorId, moderatorId, score, comments, ratingId } = req.body;
        
        let rating;

        // Si se proporciona ratingId, actualizar calificación existente
        if (ratingId) {
            rating = await ModeratorRating.findByPk(ratingId);
            if (rating) {
                rating.score = score;
                rating.comments = comments || '';
                await rating.save();
            }
        } else {
            // Crear nueva calificación
            rating = await ModeratorRating.create({
                projectId,
                indicatorId,
                moderatorId,
                score,
                comments: comments || ''
            });
        }

        if (!rating) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo crear/actualizar la calificación'
            });
        }

        res.status(200).json({
            success: true,
            data: rating,
            message: ratingId ? 'Calificación actualizada' : 'Calificación creada'
        });

    } catch (error) {
        console.error('Error en scoreIndicator:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.updateScore = async (req, res) => {
    try {
        const { ratingId, projectId, indicatorId, moderatorId, score, comments } = req.body;

        let rating;
        if (ratingId) {
            rating = await ModeratorRating.findByPk(ratingId);
        } else {
            rating = await ModeratorRating.findOne({
                where: { projectId, indicatorId, moderatorId }
            });
        }

        if (!rating) {
            return res.status(404).json({ 
                success: false,
                message: 'Calificación no encontrada' 
            });
        }

        // Actualizar los campos
        rating.score = score;
        rating.comments = comments;
        await rating.save();

        res.status(200).json({
            success: true,
            data: rating,
            message: 'Calificación actualizada exitosamente'
        });
    } catch (error) {
        console.error('Error al actualizar calificación:', error);
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
