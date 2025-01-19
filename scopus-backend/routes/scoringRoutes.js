const express = require('express');
const router = express.Router();
const { Scoring } = require('../models');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { projectId, indicatorId, score, comments } = req.body;
        const moderatorId = req.user.id;

        const scoring = await Scoring.create({
            projectId,
            indicatorId,
            moderatorId,
            score,
            comments
        });

        res.status(201).json(scoring);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;