const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

//auth routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/google', authController.google);

router.get('/:id', userController.getUser);

router.delete('/deleteMe', authController.protect, userController.deleteMe);
router.post('/updateMe/:id', authController.protect, authController.updateMe);


module.exports = router;
