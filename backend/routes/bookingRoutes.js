const express = require('express');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/create-checkout-session', bookingController.bookTour);

module.exports = router;