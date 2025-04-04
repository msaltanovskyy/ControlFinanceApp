const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser
} = require('../controllers/userController'); // Import user controller

router.post('/register', registerUser); // Register user route
router.post('/login', loginUser); // Login user route
router.get('/logout', logoutUser); // Logout user route

module.exports = router; // Export user routes