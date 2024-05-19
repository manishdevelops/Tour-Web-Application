const express = require('express');
const router = express.Router();

const isAdmin = require('../utils/isAdmin');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');


router.post('/createTour', isAdmin.isAdmin, adminController.createTour);

router.get('/all-users', authController.protect, isAdmin.isAdmin, adminController.getAllUser);

router.get('/all-bookings', authController.protect, isAdmin.isAdmin, adminController.getAllBookings);

router.get('/all-tours', authController.protect, isAdmin.isAdmin, adminController.getAllTours);

router.get('/all-reviews', authController.protect, isAdmin.isAdmin, adminController.getAllReviews);

router.get('/all-contacts', authController.protect, isAdmin.isAdmin, adminController.getAllContacts);

module.exports = router;
