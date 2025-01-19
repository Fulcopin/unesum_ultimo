import React, { useState } from 'react';
import { Button, Input, Form, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', values);
            const { token, role } = response.data; // Asegúrate de que la respuesta incluya el rol
            message.success('Inicio de sesión exitoso');
            localStorage.setItem('token', token); // Guardar el token en localStorage
            localStorage.setItem('role', role); // Guardar el rol en localStorage
            setLoading(false);
            if (onLoginSuccess) onLoginSuccess(role); // Pasa el rol a la función de éxito
            // Redirigir al dashboard correspondiente según el rol
            if (role === 'admin') {
                navigate('/admin');
            } else if (role === 'moderador') {
                navigate('/moderator');
            } else {
                navigate('/user');
            }
        } catch (error) {
            message.error('Error al iniciar sesión. Verifica tus credenciales.');
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            <Form onFinish={handleLogin}>
                <Form.Item name="username" rules={[{ required: true, message: 'Ingrese su nombre de usuario' }]}>
                    <Input placeholder="Nombre de usuario" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Ingrese su contraseña' }]}>
                    <Input.Password placeholder="Contraseña" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Iniciar Sesión</Button>
            </Form>
        </div>
    );
};

export default Login;