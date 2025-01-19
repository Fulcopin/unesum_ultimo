// backend/controllers/openAireController.js
const axios = require('axios');

exports.searchOpenAIRE = async (req, res) => {
  const { searchType, query } = req.query;

  // Define the parameters based on the search type
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
    const response = await axios.get('https://api.openaire.eu/search/publications', {
      params: apiParam,
    });
    res.json(response.data.response.results.result);
  } catch (error) {
    console.error("Error en la búsqueda en OpenAIRE:", error);
    res.status(500).json({ error: "Error en la búsqueda en OpenAIRE" });
  }
};
