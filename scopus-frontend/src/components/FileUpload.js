import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';

const FileUpload = ({ onUploadSuccess, onDelete, hasFile }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (info) => {
        const selectedFile = info.file.originFileObj || info.file;

        if (!selectedFile) {
            message.error('Error al cargar el archivo. Por favor, intenta nuevamente.');
            return;
        }

        setFile(selectedFile);
        onUploadSuccess(selectedFile);
        message.success(`Archivo ${selectedFile.name} cargado correctamente.`);
    };

    return (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <Upload
                onChange={handleFileChange}
                beforeUpload={() => false}
                showUploadList={false}
                disabled={hasFile}
            >
                <Button icon={<UploadOutlined />} disabled={hasFile}>
                    {hasFile ? 'Archivo Subido' : 'Seleccionar Archivo PDF'}
                </Button>
            </Upload>
            {hasFile && (
                <Button icon={<DeleteOutlined />} onClick={onDelete} danger>
                    Eliminar Archivo
                </Button>
            )}
        </div>
    );
};

export default FileUpload;
