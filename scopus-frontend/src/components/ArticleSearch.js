import React, { useState } from 'react';
import { Input, Button, Select, Form, Table, message, Card } from 'antd';
import axios from 'axios'; // Importa Axios directamente

const { Option } = Select;

const ArticleSearch = () => {
    const [searchType, setSearchType] = useState('autor');
    const [source, setSource] = useState('scielo');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!query) {
            message.warning('Por favor, ingresa un término de búsqueda.');
            return;
        }

        setLoading(true);
        try {
            // Realiza la solicitud directamente usando Axios
            const response = await axios.get(`http://localhost:5000/api/search/${source}`, { 
                params: { searchType, query },
                headers: { 'Content-Type': 'application/json' } 
            });
            setResults(response.data);
        } catch (error) {
           
            message.error("Ocurrió un error al realizar la búsqueda.");
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        { title: 'Título', dataIndex: 'title', key: 'title', width: '30%' },
        { title: 'Resumen', dataIndex: 'abstract', key: 'abstract', width: '50%' },
        {
            title: 'Enlace',
            dataIndex: 'url',
            key: 'url',
            render: (url) => <a href={url} target="_blank" rel="noopener noreferrer">Leer más</a>,
            width: '20%',
        },
    ];

    return (
        <Card
            title="Búsqueda de Artículos Académicos"
            style={{ borderRadius: '8px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', marginBottom: '24px' }}
        >
            <Form layout="inline" style={{ marginBottom: 16 }}>
                <Form.Item label="Tipo de búsqueda">
                    <Select 
                        value={searchType} 
                        onChange={(value) => setSearchType(value)} 
                        style={{ width: 180 }}
                    >
                        <Option value="autor">Autor</Option>
                        <Option value="doi">DOI</Option>
                        <Option value="nombre">Nombre</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Fuente">
                    <Select 
                        value={source} 
                        onChange={(value) => setSource(value)} 
                        style={{ width: 180 }}
                    >
                        <Option value="scielo">Scielo</Option>
                        <Option value="crossref">CrossRef</Option>
                        <Option value="openaire">OpenAIRE</Option>
                        <Option value="core">CORE</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Input
                        placeholder="Término de búsqueda"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ width: 200 }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleSearch} loading={loading} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff' }}>
                        Buscar
                    </Button>
                </Form.Item>
            </Form>
            <Table
                columns={columns}
                dataSource={results}
                rowKey={(record) => record.url || record.title}
                loading={loading}
                pagination={{ pageSize: 5 }}
                style={{ marginTop: '16px' }}
                bordered
            />
        </Card>
    );
};

export default ArticleSearch;
