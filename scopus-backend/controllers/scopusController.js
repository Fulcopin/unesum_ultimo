// controllers/scopusController.js

const axios = require('axios');
const fs = require('fs');
const { extractDoiOrTitle } = require('../utils/pdfUtils');

exports.checkScopus = async (req, res) => {
    try {
        // Cargar archivo PDF
        const pdfFile = req.file;
        const fileData = fs.readFileSync(pdfFile.path);

        // Extraer DOI o título del archivo
        const { doi, title } = await extractDoiOrTitle(fileData);

        // Debug: imprimir DOI y título extraídos
        console.log('DOI extraído:', doi);
        console.log('Título extraído:', title);

        // Validar si hay información suficiente para la consulta
        if (!doi && !title) {
            console.error('No se pudo encontrar DOI ni título en el archivo.');
            return res.status(400).json({ error: 'El archivo no contiene un DOI ni un título reconocible para la búsqueda en Scopus.' });
        }

        const query = doi ? `DOI(${doi})` : `TITLE("${title}")`;

        // Debug: imprimir la consulta
        console.log('Consulta a Scopus:', query);

        // Solicitar datos a la API de Scopus
        const response = await axios.get('https://api.elsevier.com/content/search/scopus', {
            params: { query },
            headers: { 'X-ELS-APIKey': process.env.SCOPUS_API_KEY }
        });

        // Procesar y enviar respuesta
        const results = response.data['search-results'].entry;
        res.json({
            exists: results && results.length > 0,
            fileName: pdfFile.originalname,
            data: results[0] || null,
        });

        console.log('Verificación en Scopus completada.');
    } catch (error) {
        console.error('Error en checkScopus:', error.message);
        res.status(500).json({ error: 'Error al verificar en Scopus.' });
    }
};
