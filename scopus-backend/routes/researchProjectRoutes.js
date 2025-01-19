const express = require("express");
const multer = require("multer");
const researchProjectController = require("../controllers/researchProjectController");

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/projects", upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'acceptanceCertificate', maxCount: 1 },
    { name: 'publicationCertificate', maxCount: 1 }
]), researchProjectController.createProject);

module.exports = router;