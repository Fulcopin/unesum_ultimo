import React, { useState } from 'react';
import { Button, Input, Form, message, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const Register = ({ onRegisterSuccess }) => {
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/auth/register', values);
            message.success('Usuario registrado exitosamente');
            setLoading(false);
            if (onRegisterSuccess) onRegisterSuccess();
        } catch (error) {
            message.error('Error al registrar el usuario. Verifica los datos e inténtalo de nuevo.');
            console.error('Error al registrar usuario:', error);  // Añade este log para ver el detalle
            setLoading(false);
        }
    };

    return (
        <Form onFinish={handleRegister} style={{ maxWidth: '300px', margin: '0 auto' }}>
            <Form.Item name="username" rules={[{ required: true, message: 'Ingrese un nombre de usuario' }]}>
                <Input placeholder="Nombre de usuario" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Ingrese una contraseña' }]}>
                <Input.Password placeholder="Contraseña" />
            </Form.Item>
            <Form.Item name="confirmPassword" rules={[{ required: true, message: 'Confirme la contraseña' }]}>
                <Input.Password placeholder="Confirmar Contraseña" />
            </Form.Item>
            <Form.Item name="role" rules={[{ required: true, message: 'Seleccione un rol' }]}>
                <Select placeholder="Seleccione un rol">
                    <Option value="admin">Admin</Option>
                    <Option value="usuario">Usuario</Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
                Registrarse
            </Button>
        </Form>
    );
};

export default Register;
