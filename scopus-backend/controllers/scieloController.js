const axios = require('axios');

exports.searchScielo = async (req, res) => {
  const { searchType, query } = req.query;
  let url = '';
  let params = {
    fmt: 'json', 
    api: 'v2', 
    collection: 'scl', 
    begin_date: '2021-01', 
    end_date: '2021-12', 
  };

  
  switch (searchType) {
    case 'autor':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.author = query; 
      break;
    case 'doi':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.pid = query; 
      break;
    case 'nombre':
      url = 'https://usage.apis.scielo.org/reports/ir_a1';
      params.title = query; 
      break;
    default:
      return res.status(400).json({ error: 'Tipo de búsqueda no válido' });
  }

  try {
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error("Error en la búsqueda en SciELO:", error);
    res.status(500).json({ error: "Error en la búsqueda en SciELO" });
  }
};
