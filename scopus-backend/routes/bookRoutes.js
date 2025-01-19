// scopus-backend/routes/bookRoutes.js
const express = require('express');
const { searchGoogleBooks, searchOpenLibrary } = require('../controllers/bookController');
const router = express.Router();

router.get('/search/google', searchGoogleBooks);
router.get('/search/openlibrary', searchOpenLibrary);

module.exports = router;
