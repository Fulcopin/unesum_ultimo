// src/components/ScopusVerification.js

import React, { useState } from 'react';
import FileUpload from './FileUpload';
import ResultTable from './ResultTable';
import { Button, message } from 'antd';
import axios from 'axios';
import { js2xml } from 'xml-js';

const ScopusVerification = ({ onLogout }) => {
    const [results, setResults] = useState([]);

    const handleUploadSuccess = (file) => {
        const newResult = {
            key: `${file.name}-${Date.now()}`,
            fileName: file.name,
            file: file,
            status: 'not_checked',
            data: null,
        };
        setResults([newResult]);
    };

    const handleVerify = async (record) => {
        const formData = new FormData();
        formData.append('pdf', record.file);
    
        try {
            const response = await axios.post('http://localhost:5000/api/check-scopus', formData);
            const existsInScopus = response.data.exists;
            
            const updatedResult = {
                ...record,
                status: existsInScopus ? 'exists' : 'not_exists', // Cambia el estado según el valor de exists
                data: existsInScopus ? response.data.data : null,
            };
            setResults([updatedResult]);
        } catch (error) {
            console.error('Error al verificar el archivo en Scopus:', error);
            const updatedResult = {
                ...record,
                status: 'not_exists',
                data: null,
            };
            setResults([updatedResult]);
        }
    };
    

    const generateXML = (record) => {
        if (!record.data) {
            console.error('No hay datos para generar el XML.');
            return;
        }
        const xmlOptions = { compact: true, ignoreComment: true, spaces: 4 };
        const xmlData = js2xml(record.data, xmlOptions);
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${record.fileName}.xml`;
        link.click();
    };

    const handleDelete = () => {
        setResults([]);
        message.info('Archivo eliminado.');
    };

    return (
        <div>
            <FileUpload onUploadSuccess={handleUploadSuccess} onDelete={handleDelete} hasFile={results.length > 0} />
            {results.length > 0 && (
                <ResultTable results={results} onVerify={handleVerify} onGenerateXML={generateXML} />
            )}
            <Button onClick={onLogout} style={{ marginTop: '20px' }}>Cerrar Sesión</Button>
        </div>
    );
};

export default ScopusVerification;
