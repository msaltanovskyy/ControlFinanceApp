const express = require('express');
const router = express.Router();

const {
    registerUser,
} = require('../controllers/userController'); // Import user controller
const { model } = require('mongoose');

router.post('/', registerUser); // Register user route
router.post('/login', loginUser); // Login user route

module.exports = router; // Export user routes