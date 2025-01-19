const Document = require('../models/Document');

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();
        res.status(200).json(documents);
    } catch (error) {
        console.error('Error al obtener los documentos:', error);
        res.status(500).json({ error: 'Error al obtener los documentos.' });
    }
};