// backend/controllers/crossRefController.js
const axios = require('axios');

exports.searchCrossRef = async (req, res) => {
  const { searchType, query } = req.query;

  // Dynamically set the CrossRef API parameter based on search type
  let apiParam;
  switch (searchType) {
    case 'autor':
      apiParam = { 'query.author': query };
      break;
    case 'doi':
      apiParam = { query: query };
      break;
    case 'nombre':
      apiParam = { 'query.title': query };
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get('https://api.crossref.org/works', {
      params: apiParam,
    });
    res.json(response.data.message.items);
  } catch (error) {
    console.error("Error en la búsqueda en CrossRef:", error);
    res.status(500).json({ error: "Error en la búsqueda en CrossRef" });
  }
};
