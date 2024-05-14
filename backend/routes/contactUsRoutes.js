const express = require('express');
const contactUsController = require('../controllers/contactUsController');

const router = express.Router();

router.post('/createContact', contactUsController.createContact);

module.exports = router;