import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, TeamOutlined, LogoutOutlined, SettingOutlined , UserAddOutlined  } from '@ant-design/icons';
import UserManagement from './UserManagement.js';
import RoleManagement from './RoleManagement.js';
import SystemSettings from './SystemSettings.js';
import Register from './Register.js';
const { Header, Sider, Content } = Layout;

const AdminDashboard = ({ onLogout }) => {
    const [selectedMenu, setSelectedMenu] = useState('users');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'users':
                return <UserManagement />;
            case 'roles':
                return <RoleManagement />;
            case 'settings':
                return <SystemSettings />;
            case 'registro': // Nuevo caso para el componente de búsqueda de artículos
                return <Register />;        
            default:
                return <UserManagement />;
        }
    };

    return (
        <Layout style={{ width: '1535px', height: '728px', borderRadius: '8px' }}>
            <Sider width={250} collapsible style={{ backgroundColor: '#001529' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['users']}
                    onClick={(e) => setSelectedMenu(e.key)}
                >
                    <Menu.Item key="users" icon={<UserOutlined />}>
                        Gestión de Usuarios
                    </Menu.Item>
                    <Menu.Item key="roles" icon={<TeamOutlined />}>
                        Gestión de Roles
                    </Menu.Item>
                    <Menu.Item key="settings" icon={<SettingOutlined />}>
                        Configuración del Sistema
                    </Menu.Item>
                    <Menu.Item key="registro" icon={<UserAddOutlined />}> {/* Nueva opción de menú */}
                        Registro
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                        Cerrar Sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#001529', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                    Panel de Administración
                </Header>
                <Content style={{ padding: '24px', background: '#fff', overflowY: 'auto' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminDashboard;