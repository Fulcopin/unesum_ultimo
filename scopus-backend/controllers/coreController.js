// backend/controllers/coreController.js
const axios = require('axios');

exports.searchCORE = async (req, res) => {
  const { searchType, query } = req.query;


  let apiParam;
  switch (searchType) {
    case 'autor':
      apiParam = { author: query };
      break;
    case 'doi':
      apiParam = { doi: query };
      break;
    case 'nombre':
      apiParam = { title: query };
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get('https://core.ac.uk:443/api-v2/articles/search', {
      params: apiParam,
      headers: { 'Authorization': `Bearer TU_API_KEY` }, // Reemplaza con tu API Key de CORE
    });
    res.json(response.data.data);
  } catch (error) {
    console.error("Error en la búsqueda en CORE:", error);
    res.status(500).json({ error: "Error en la búsqueda en CORE" });
  }
};
