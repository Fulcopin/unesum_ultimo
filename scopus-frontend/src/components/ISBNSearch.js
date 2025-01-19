// src/components/ISBNSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import BookResults from './BookResults';

const ISBNSearch = () => {
    const [isbn, setIsbn] = useState('');
    const [bookResults, setBookResults] = useState({ googleBooks: null, openLibrary: null });

    const handleISBNLookup = async () => {
        try {
            console.log("ISBN buscado:", isbn);

            // Solicitud al backend para Google Books API
            const googleResponse = await axios.get(`http://localhost:5000/api/books/search/google`, {
                params: { isbn }
            });
            console.log("Resultado de Google Books:", googleResponse.data);

            setBookResults((prevResults) => ({
                ...prevResults,
                googleBooks: googleResponse.data
            }));

            // Solicitud al backend para Open Library API
            const openLibraryResponse = await axios.get(`http://localhost:5000/api/books/search/openlibrary`, {
                params: { isbn }
            });
            console.log("Resultado de Open Library:", openLibraryResponse.data);

            setBookResults((prevResults) => ({
                ...prevResults,
                openLibrary: openLibraryResponse.data
            }));
        } catch (error) {
            if (error.response) {
                console.error("Error en la solicitud de ISBN - Respuesta de la API:", error.response.data);
                alert(`Error en la solicitud: ${error.response.data.error || "Error desconocido en el servidor"}`);
            } else if (error.request) {
                console.error("Error en la solicitud de ISBN - Sin respuesta de la API:", error.request);
                alert("Error en la solicitud: No hay respuesta del servidor.");
            } else {
                console.error("Error en la solicitud de ISBN:", error.message);
                alert(`Error en la solicitud: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <h2>Búsqueda de ISBN</h2>
            <input
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                placeholder="Ingrese el ISBN"
            />
            <button onClick={handleISBNLookup}>Buscar</button>
            <BookResults results={bookResults} />
        </div>
    );
};

export default ISBNSearch;
