// src/components/Dashboard.js
import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { FileSearchOutlined, LogoutOutlined, FundProjectionScreenOutlined, BookOutlined } from '@ant-design/icons';
import ScopusVerification from './ScopusVerification';
import ResearchProjects from './ResearchProjects';
import ISBNSearch from './ISBNSearch';

const { Header, Sider, Content } = Layout;

const Dashboard = ({ onLogout }) => {
    const [selectedMenu, setSelectedMenu] = useState('scopus');

    const renderContent = () => {
        switch (selectedMenu) {
            case 'scopus':
                return <ScopusVerification />;
            case 'research':
                return <ResearchProjects />;
            case 'isbnSearch':
                return <ISBNSearch />;
            default:
                return <ScopusVerification />;
        }
    };

    return (
        <Layout style={{ width: '1535px', height: '728px', borderRadius: '8px' }}>
            <Sider width={250} collapsible style={{ backgroundColor: '#001529' }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['scopus']}
                    onClick={(e) => setSelectedMenu(e.key)}
                >
                    <Menu.Item key="scopus" icon={<FileSearchOutlined />}>
                        Verificación en Scopus
                    </Menu.Item>
                    <Menu.Item key="research" icon={<FundProjectionScreenOutlined />}>
                        Proyectos de Investigación
                    </Menu.Item>
                    <Menu.Item key="isbnSearch" icon={<BookOutlined />}>
                        Búsqueda de ISBN
                    </Menu.Item>
                    <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
                        Cerrar Sesión
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#001529', color: '#fff', fontSize: '20px', textAlign: 'center' }}>
                    Aplicación de Verificación en Scopus
                </Header>
                <Content style={{ padding: '24px', background: '#fff', overflowY: 'auto' }}>
                    {renderContent()}
                </Content>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
