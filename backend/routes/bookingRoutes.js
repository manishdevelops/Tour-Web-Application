const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');


const router = express.Router();

router.post('/create-checkout-session', authController.protect, bookingController.getCheckoutSession);

router.post('/book-tour', authController.protect, bookingController.bookMyTour);

router.get('/my-tours', authController.protect, bookingController.getMyTours);

module.exports = router;