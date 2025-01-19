// src/components/CreateUserForm.js
import React, { useState } from 'react';
import { Button, Input, Form, message, Select } from 'antd';
import axios from 'axios';

const CreateUserForm = ({ token }) => {
    const [loading, setLoading] = useState(false);

    const handleCreateUser = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:5000/api/auth/create-user',
                values,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            message.success(response.data.message);
        } catch (error) {
            message.error('Error al crear usuario');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleCreateUser} style={{ maxWidth: '300px', margin: '0 auto' }}>
            <Form.Item name="username" rules={[{ required: true, message: 'Ingrese el nombre de usuario' }]}>
                <Input placeholder="Nombre de Usuario" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Ingrese la contraseña' }]}>
                <Input.Password placeholder="Contraseña" />
            </Form.Item>
            <Form.Item name="role" rules={[{ required: true, message: 'Seleccione un rol' }]}>
                <Select placeholder="Seleccione un rol">
                    <Select.Option value="user">Usuario</Select.Option>
                    <Select.Option value="admin">Administrador</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
                Crear Usuario
            </Button>
        </Form>
    );
};

export default CreateUserForm;
