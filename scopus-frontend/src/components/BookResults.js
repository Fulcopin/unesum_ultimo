// src/components/BookResults.js
import React from 'react';

const BookResults = ({ results }) => {
    return (
        <div>
            <h3>Resultados de Búsqueda</h3>
            {results.googleBooks && (
                <div>
                    <h4>Google Books</h4>
                    <p><strong>Título:</strong> {results.googleBooks.title}</p>
                    <p><strong>Autor:</strong> {results.googleBooks.authors?.join(', ')}</p>
                    <p><strong>Editorial:</strong> {results.googleBooks.publisher}</p>
                    <p><strong>Fecha de Publicación:</strong> {results.googleBooks.publishedDate}</p>
                </div>
            )}
            {results.openLibrary && (
                <div>
                    <h4>Open Library</h4>
                    <p><strong>Título:</strong> {results.openLibrary.title}</p>
                    <p><strong>Autor:</strong> {results.openLibrary.authors?.map(author => author.name).join(', ')}</p>
                    <p><strong>Editorial:</strong> {results.openLibrary.publishers?.map(p => p.name).join(', ')}</p>
                </div>
            )}
        </div>
    );
};

export default BookResults;
