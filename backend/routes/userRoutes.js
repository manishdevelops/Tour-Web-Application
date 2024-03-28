const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');


router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.get('/:id', authController.protect, userController.getUser);

router.delete('/deleteMe', authController.protect, userController.deleteMe);

module.exports = router;
