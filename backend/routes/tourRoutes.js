const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

router.get('/getTours', tourController.getAllTours);
router.get('/tourResults', tourController.getTourResults);

module.exports = router;