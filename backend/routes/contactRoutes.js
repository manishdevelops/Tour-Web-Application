const express = require('express');
const contactController = require('../controllers/contactController');

const router = express.Router()

router.post('/createContact', contactController.contact);

module.exports = router;
