const express = require('express');
const router = express.Router();

const reviewRouter = require('./reviewRoutes');

const tourController = require('../controllers/tourController');

router.use('/:tourId/reviews', reviewRouter);

router.get('/getTours', tourController.getAllTours);
router.get('/tourResults', tourController.getTourResults);
router.get('/tourOverview/:slug', tourController.getTour);
router.get('/top-4-tours', tourController.topRatedTours);
router.get('/cheap-4-tours', tourController.topCheapTours);

router.route('/:id').get(tourController.tour);

router
    .route('/tours-within/:distance/center/:latlng/unit/:unit')
    .get(tourController.getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

module.exports = router;