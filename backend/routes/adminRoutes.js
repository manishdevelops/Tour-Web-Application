const express = require('express');
const router = express.Router();

const isAdmin = require('../utils/isAdmin');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');


router.post('/create-tour', authController.protect, isAdmin.isAdmin, adminController.createTour);

router.patch('/edit-tour/:tourId', authController.protect, isAdmin.isAdmin, adminController.editTour);

router.delete('/delete-tour/:id', authController.protect, isAdmin.isAdmin, adminController.deleteTour);

router.get('/all-users', authController.protect, isAdmin.isAdmin, adminController.getAllUser);

router.get('/all-bookings', authController.protect, isAdmin.isAdmin, adminController.getAllBookings);

router.get('/all-tours', authController.protect, isAdmin.isAdmin, adminController.getAllTours);

router.get('/all-reviews', authController.protect, isAdmin.isAdmin, adminController.getAllReviews);

router.get('/all-contacts', authController.protect, isAdmin.isAdmin, adminController.getAllContacts);

router.get('/all-statistics', authController.protect, isAdmin.isAdmin, adminController.getStatistics);

router.get('/booking-earnings-by-date', authController.protect, isAdmin.isAdmin, adminController.getBookingEarnings);

module.exports = router;
