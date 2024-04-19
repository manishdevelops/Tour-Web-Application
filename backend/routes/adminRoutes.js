const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.post('/create-tour', adminController.createTour);

module.exports = router;
