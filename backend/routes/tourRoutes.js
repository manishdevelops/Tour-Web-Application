const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

router.get('/getTours', tourController.getAllTours);
router.get('/tourResults', tourController.getTourResults);
router.get('/tourOverview/:slug', tourController.getTour);

module.exports = router;