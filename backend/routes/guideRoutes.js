const express = require('express');
const isGuide = require('../utils/isGuide');
const authController = require('../controllers/authController');
const guideController = require('../controllers/guideController');

const router = express.Router();

router.get('/get-assigned-tours', authController.protect, isGuide.isGuide, guideController.getAssignedTour);

module.exports = router;