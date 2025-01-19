const pdfParse = require('pdf-parse');

async function extractDoiOrTitle(pdfData) {
    const data = await pdfParse(pdfData);
    const text = data.text;

    // Expresión regular para buscar un DOI en el texto
    const doiMatch = text.match(/10.\d{4,9}\/[-._;()/:A-Z0-9]+/i);
    if (doiMatch) return { doi: doiMatch[0] };

    // Si no hay DOI, usa la primera línea como título
    const title = text.split('\n').find(line => line.trim().length > 0);
    return title ? { title: title.trim() } : { error: 'No se pudo encontrar DOI ni título' };
}

module.exports = { extractDoiOrTitle };
