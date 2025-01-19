import React, { useState, useEffect } from 'react';
import { Layout, Menu, Select, Button } from 'antd';
import { UserOutlined, FileOutlined, LogoutOutlined, FormOutlined } from '@ant-design/icons';
import axios from 'axios';
import ScoringForm from './ScoringForm';
import './ModeratorDashboard.css';

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const ModeratorDashboard = ({ onLogout }) => {
    const [selectedMenu, setSelectedMenu] = useState('documents');
    const [userId, setUserId] = useState('');
    const [projectId, setProjectId] = useState('');
    const [documents, setDocuments] = useState([]);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        }
    };

    const fetchProjects = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/projects/user/${userId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setProjects(response.data);
        } catch (error) {
            console.error('Error al cargar los proyectos:', error);
        }
    };

    const fetchDocuments = async (projectId) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/documents/project/${projectId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setDocuments(response.data);
        } catch (error) {
            console.error('Error al obtener los documentos:', error);
        }
    };

    const handleUserChange = (value) => {
        setUserId(value);
        setProjectId(''); // Reinicia el proyecto seleccionado
        setDocuments([]); // Reinicia los documentos
        if (value) {
            fetchProjects(value);
        } else {
            setProjects([]); // Limpia la lista de proyectos si no hay usuario seleccionado
        }
    };

    const handleProjectChange = (value) => {
        setProjectId(value);
        if (value) {
            fetchDocuments(value);
        } else {
            setDocuments([]); // Limpia la lista de documentos si no hay proyecto seleccionado
        }
    };

    const handleDocumentClick = (filename) => {
        setSelectedDocument(`http://localhost:5000/api/documents/${filename}`);
    };

    const renderContent = () => {
        switch (selectedMenu) {
            case 'documents':
                return (
                    <div>
                        <h2>Documentos:</h2>
                        <div className="select-container">
                            <Select
                                placeholder="Select User"
                                onChange={handleUserChange}
                                value={userId}
                                style={{ width: 200, marginRight: 10 }}
                            >
                                {users.map(user => (
                                    <Option key={user.id} value={user.id}>
                                        {user.username}
                                    </Option>
                                ))}
                            </Select>

                            {userId && (
                                <Select
                                    placeholder="Select Project"
                                    onChange={handleProjectChange}
                                    value={projectId}
                                    style={{ width: 200 }}
                                >
                                    {projects.map(project => (
                                        <Option key={project.id} value={project.id}>
                                            {project.name}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </div>

                        <ul className="document-list">
                            {documents.map(doc => (
                                <li key={doc.id} className="document-item">
                                    <Button type="link" onClick={() => handleDocumentClick(doc.filename)}>
                                        {doc.filename}
                                    </Button>
                                </li>
                            ))}
                        </ul>

                        {selectedDocument && (
                            <div className="document-viewer">
                                <h2>Vista previa del documento:</h2>
                                <iframe
                                    src={selectedDocument}
                                    width="100%"
                                    height="600"
                                    title="Document Viewer"
                                    className="iframe-viewer"
                                ></iframe>
                            </div>
                        )}
                    </div>
                );
            case 'scoring':
                return (
                    <div>
                        <h2>Calificación de Indicadores:</h2>
                        {projectId ? (
                            <ScoringForm projectId={projectId} />
                        ) : (
                            <p>Seleccione un proyecto para calificar.</p>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Layout style={{ width: '1535px', height: '728px', borderRadius: '8px' }}>
            <Sider width={250} collapsible style={{ backgroundColor: '#001529' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['documents']}
                    onClick={(e) => setSelectedMenu(e.key)}
                >
                    <Menu.Item key="documents" icon={<FileOutlined />}>
                        Documentos
                    </Menu.Item>
                    <Menu.Item key="scoring" icon={<FormOutlined />}>
                        Calificación
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                        Cerrar Sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#001529', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                    Panel de Moderador
                </Header>
                <Content style={{ padding: '24px', background: '#fff', overflowY: 'auto' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default ModeratorDashboard;