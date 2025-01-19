import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { message } from 'antd';
import Dashboard from './components/Dashboard.js';
import AdminDashboard from './components/AdminDashboard.js';
import ModeratorDashboard from './components/ModeratorDashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Unauthorized from './components/Unauthorized.js';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        if (token && userRole) {
            setRole(userRole);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = (userRole) => {
        setRole(userRole);
        setIsAuthenticated(true);
        message.success("Inicio de sesión exitoso.");
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setRole('');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        message.info("Sesión cerrada.");
    };

    const getDashboardComponent = () => {
        switch (role) {
            case 'admin':
                return <AdminDashboard onLogout={handleLogout} />;
            case 'moderador':
                return <ModeratorDashboard onLogout={handleLogout} />;
            case 'usuario':
                return <Dashboard onLogout={handleLogout} />;
            default:
                return <Navigate to="/unauthorized" />;
        }
    };

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    {isAuthenticated ? (
                        <>
                            <Route path="/dashboard" element={getDashboardComponent()} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />
                            <Route path="*" element={<Navigate to="/dashboard" />} />
                        </>
                    ) : (
                        <>
                            <Route path="*" element={<Navigate to="/login" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;