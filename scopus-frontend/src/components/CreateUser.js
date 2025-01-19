// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, message, Select } from 'antd';

const { Option } = Select;

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleCreateUser = async () => {
        if (!username || !password) {
            message.warning('Por favor, completa todos los campos.');
            return;
        }

        try {
            const token = localStorage.getItem('token'); // Token JWT de la sesión de administrador
            await axios.post(
                'http://localhost:5000/api/auth/create-user',
                { username, password, role },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            message.success(`Usuario ${username} creado exitosamente.`);
            setUsername('');
            setPassword('');
            setRole('user');
        } catch (error) {
            message.error('Error al crear el usuario.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Crear Nuevo Usuario</h2>
            <Input
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Input.Password
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <Select
                value={role}
                onChange={(value) => setRole(value)}
                style={{ width: '100%', marginBottom: '10px' }}
            >
                <Option value="user">Usuario</Option>
                <Option value="admin">Administrador</Option>
            </Select>
            <Button type="primary" onClick={handleCreateUser}>
                Crear Usuario
            </Button>
        </div>
    );
};

export default CreateUser;
