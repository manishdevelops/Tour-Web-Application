const express = require('express');
const router = express.Router();

const tourController = require('../controllers/tourController');

router.get('/getTours', tourController.getAllTours);

module.exports = router;