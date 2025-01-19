import React from 'react';
import { Table, Button } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, FileTextOutlined } from '@ant-design/icons';

const ResultTable = ({ results, onVerify, onGenerateXML }) => {
    const columns = [
        { title: 'Nombre del Archivo', dataIndex: 'fileName', key: 'fileName' },
        {
            title: 'Estado en Scopus',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                if (status === 'exists') {
                    return <CheckCircleTwoTone twoToneColor="#52c41a" />;
                } else if (status === 'not_exists') {
                    return <CloseCircleTwoTone twoToneColor="#ff4d4f" />;
                } else {
                    return 'No verificado';
                }
            },
        },
        {
            title: 'Acciones',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        icon={<FileTextOutlined />}
                        onClick={() => onVerify(record)}
                        disabled={record.status !== 'not_checked'}
                    >
                        Verificar en Scopus
                    </Button>
                    {record.status === 'exists' && (
                        <Button icon={<FileTextOutlined />} onClick={() => onGenerateXML(record)}>
                            Generar XML
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return <Table columns={columns} dataSource={results} rowKey="fileName" pagination={false} />;
};

export default ResultTable;
