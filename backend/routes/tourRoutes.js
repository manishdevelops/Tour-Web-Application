const express = require('express');
const router = express.Router();

const reviewRouter = require('./reviewRoutes');

const tourController = require('../controllers/tourController');

router.use('/:tourId/reviews', reviewRouter);

router.get('/getTours', tourController.getAllTours);
router.get('/tourResults', tourController.getTourResults);
router.get('/tourOverview/:slug', tourController.getTour);

router.route('/:id').get(tourController.tour);

module.exports = router;