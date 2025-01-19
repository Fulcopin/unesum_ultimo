import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            const response = await axios.get('/api/admin/documents', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDocuments(response.data);
        };

        fetchDocuments();
    }, []);

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {documents.map(doc => (
                    <li key={doc.id}>{doc.filename} - {doc.path}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;