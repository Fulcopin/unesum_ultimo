// scopus-backend/controllers/bookController.js
const axios = require('axios');

// Controlador para buscar en Google Books API
exports.searchGoogleBooks = async (req, res) => {
    const { isbn } = req.query;
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes`, {
            params: {
                q: `isbn:${isbn}`,
                key: process.env.GOOGLE_BOOKS_API_KEY
            }
        });

        const book = response.data.items ? response.data.items[0].volumeInfo : null;
        res.json(book);
    } catch (error) {
        console.error('Error al consultar Google Books API:', error.message);
        res.status(500).json({ error: 'Error al consultar Google Books API' });
    }
};

// Controlador para buscar en Open Library API
exports.searchOpenLibrary = async (req, res) => {
    const { isbn } = req.query;
    try {
        const response = await axios.get(`https://openlibrary.org/api/books`, {
            params: {
                bibkeys: `ISBN:${isbn}`,
                format: 'json',
                jscmd: 'data'
            }
        });

        const book = response.data[`ISBN:${isbn}`] || null;
        res.json(book);
    } catch (error) {
        console.error('Error al consultar Open Library API:', error.message);
        res.status(500).json({ error: 'Error al consultar Open Library API' });
    }
};
