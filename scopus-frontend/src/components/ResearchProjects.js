// filepath: /c:/Users/fupifigu/Videos/test_unesum/unesum-app-final/scopus-frontend/src/components/ResearchProjects.js
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const ResearchProjects = ({ onProjectAdded }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [acceptanceFile, setAcceptanceFile] = useState(null);
    const [publicationFile, setPublicationFile] = useState(null);
    const [users, setUsers] = useState([]); // Nuevo estado para los usuarios
    const [userId, setUserId] = useState(''); // Estado para el userId

    // Obtener usuarios y userId cuando el componente se monta
    useEffect(() => {
        fetchUsers();
        fetchUserId(); // Obtener el userId del usuario autenticado
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            message.error('Error al cargar los usuarios');
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/user', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUserId(response.data.id); // Asume que la respuesta contiene el userId
        } catch (error) {
            message.error('Error al obtener el ID del usuario');
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();

        // Agregar valores del formulario
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('type', values.type);
        formData.append('period', values.period);
        formData.append('participants', JSON.stringify(values.participants)); // Agregar participantes
        formData.append('userId', userId); // Agregar userId

        // Agregar archivos
        fileList.forEach(file => {
            formData.append('images', file);
        });

        if (acceptanceFile) {
            formData.append('acceptanceCertificate', acceptanceFile);
        }

        if (publicationFile) {
            formData.append('publicationCertificate', publicationFile);
        }

        try {
            await axios.post('http://localhost:5000/api/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success('Proyecto agregado con éxito');
            form.resetFields();
            setFileList([]);
            setAcceptanceFile(null);
            setPublicationFile(null);
            if (onProjectAdded) onProjectAdded();
        } catch (error) {
            message.error('Error al agregar el proyecto');
        } finally {
            setLoading(false);
        }
    };

    // Manejadores existentes
    const handleFileChange = ({ fileList }) => {
        setFileList(fileList.map(file => file.originFileObj));
    };

    const handleAcceptanceFileChange = ({ file }) => {
        setAcceptanceFile(file.originFileObj);
    };

    const handlePublicationFileChange = ({ file }) => {
        setPublicationFile(file.originFileObj);
    };

    return (
        <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item name="name" label="Nombre del Proyecto" rules={[{ required: true, message: 'Por favor ingresa el nombre del proyecto' }]}>
                <Input />
            </Form.Item>
            
            <Form.Item name="description" label="Descripción" rules={[{ required: true, message: 'Por favor ingresa una descripción' }]}>
                <Input.TextArea rows={4} />
            </Form.Item>
            
            <Form.Item name="type" label="Tipo de Investigación" rules={[{ required: true, message: 'Por favor selecciona el tipo de investigación' }]}>
                <Input />
            </Form.Item>
            
            <Form.Item name="period" label="Periodo" rules={[{ required: true, message: 'Por favor selecciona el periodo' }]}>
                <Select>
                    <Option value="2021">2021</Option>
                    <Option value="2022">2022</Option>
                    <Option value="2023">2023</Option>
                </Select>
            </Form.Item>

            {/* Nuevo selector de participantes */}
            <Form.Item 
                name="participants" 
                label="Participantes del Proyecto"
                rules={[{ required: true, message: 'Por favor selecciona al menos un participante' }]}
            >
                <Select
                    mode="multiple"
                    placeholder="Selecciona los participantes"
                    maxTagCount={6}
                    style={{ width: '100%' }}
                >
                    {users.map(user => (
                        <Option key={user.id} value={user.id}>
                            {user.username} {/* Asume que el usuario tiene un campo 'username' */}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item label="Imágenes del Proyecto">
                <Upload
                    beforeUpload={() => false}
                    multiple
                    onChange={handleFileChange}
                >
                    <Button icon={<UploadOutlined />}>Seleccionar Imágenes</Button>
                </Upload>
            </Form.Item>
            
            <Form.Item label="Certificado de Aceptación (PDF)">
                <Upload
                    beforeUpload={() => false}
                    onChange={handleAcceptanceFileChange}
                >
                    <Button icon={<UploadOutlined />}>Seleccionar Certificado de Aceptación</Button>
                </Upload>
            </Form.Item>
            
            <Form.Item label="Certificado de Publicación (PDF)">
                <Upload
                    beforeUpload={() => false}
                    onChange={handlePublicationFileChange}
                >
                    <Button icon={<UploadOutlined />}>Seleccionar Certificado de Publicación</Button>
                </Upload>
            </Form.Item>
            
            <Button type="primary" htmlType="submit" loading={loading}>
                Guardar Proyecto
            </Button>
        </Form>
    );
};

export default ResearchProjects;
