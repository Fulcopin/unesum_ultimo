// filepath: /c:/Users/fupifigu/Videos/test_unesum/unesum-app-final/scopus-backend/controllers/researchProjectController.js
const ResearchProject = require('../models/researchproject');
const ProjectImage = require('../models/ProjectImage');
const Document = require('../models/Document');
const User = require('../models/User');
const fs = require('fs');
const path = require('path');

exports.createProject = async (req, res) => {
    const { name, description, type, period, participants, userId, documentDescription } = req.body;
    const files = req.files.images || [];
    const acceptanceCertificate = req.files.acceptanceCertificate ? req.files.acceptanceCertificate[0] : null;
    const publicationCertificate = req.files.publicationCertificate ? req.files.publicationCertificate[0] : null;

    try {
        if (!userId) {
            return res.status(400).json({ error: 'userId es requerido' });
        }

        const project = await ResearchProject.create({ name, description, type, period, userId });

        for (const file of files) {
            const imagePath = `uploads/${file.filename}`;
            await ProjectImage.create({
                path: imagePath,
                filename: file.originalname,
                projectId: project.id,
            });

            await Document.create({
                path: imagePath,
                filename: file.originalname,
                projectId: project.id,
                userId: userId,
                type: 'image',
                description: documentDescription
            });
        }

        if (acceptanceCertificate) {
            const acceptancePath = `uploads/${acceptanceCertificate.filename}`;
            await Document.create({
                path: acceptancePath,
                filename: acceptanceCertificate.originalname,
                projectId: project.id,
                userId: userId,
                type: 'acceptanceCertificate',
                description: documentDescription
            });
        }

        if (publicationCertificate) {
            const publicationPath = `uploads/${publicationCertificate.filename}`;
            await Document.create({
                path: publicationPath,
                filename: publicationCertificate.originalname,
                projectId: project.id,
                userId: userId,
                type: 'publicationCertificate',
                description: documentDescription
            });
        }

        if (participants) {
            const participantIds = JSON.parse(participants);
            await project.addParticipants(participantIds);
        }

        const projectWithParticipants = await ResearchProject.findByPk(project.id, {
            include: [{
                model: User,
                as: 'participants',
                through: { attributes: [] }
            }]
        });

        res.status(201).json({ project: projectWithParticipants });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        res.status(500).json({ error: 'Error al crear el proyecto.' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username'] // Solo obtener 'id' y 'username'
        });
        res.json(users);
    } catch (error) {
        console.error('Error al obtener usuarios:', error); // Registro detallado del error
        res.status(500).json({
            success: false,
            error: 'Error al obtener usuarios.'
        });
    }
};

exports.registerAll = async (req, res) => {
    const { projects, users, documents, images } = req.body;

    try {
        // Register projects
        for (const projectData of projects) {
            const project = await ResearchProject.create(projectData);
            
            // Register project images
            for (const imageData of images) {
                if (imageData.projectId === projectData.id) {
                    await ProjectImage.create({
                        ...imageData,
                        projectId: project.id
                    });
                }
            }

            // Register project documents
            for (const documentData of documents) {
                if (documentData.projectId === projectData.id) {
                    await Document.create({
                        ...documentData,
                        projectId: project.id
                    });
                }
            }
        }

        // Register users
        for (const userData of users) {
            await User.create(userData);
        }

        res.status(201).json({ success: true, message: 'All data registered successfully' });
    } catch (error) {
        console.error('Error registering all data:', error);
        res.status(500).json({ error: 'Error registering all data.' });
    }
};