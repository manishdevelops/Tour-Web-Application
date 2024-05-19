const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');
const isAdmin = require('../utils/isAdmin');

const router = express.Router();

router.post('/booked-already', authController.protect, bookingController.isTourBooked);

router.post('/create-checkout-session', authController.protect, bookingController.getCheckoutSession);

router.post('/book-tour', authController.protect, bookingController.bookMyTour);

router.get('/my-tours', authController.protect, bookingController.getMyTours);

router.get('/all-bookings', authController.protect, isAdmin.isAdmin, bookingController.getAllTours);

module.exports = router;