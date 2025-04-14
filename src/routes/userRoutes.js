const express = require('express');
const router = express.Router();

const {
    registerUser,
    loginUser,
    logoutUser,
    editUser,
    deactiveUser,
    getUser,
    getAllUsers,
    setBalance
} = require('../controllers/userController'); // Import user controller

//POST routes
router.post('/register', registerUser); // Register user route
router.post('/login', loginUser); // Login user route
router.post('/logout', logoutUser); // Logout user route
router.post('/edit/:id',editUser); // Edit user route
router.post('/deactive/:id', deactiveUser); // Deactive user route
router.post('/setbalance/:id', setBalance); // Set balance route

//GET routes
router.get('/:id', getUser); // Get user route
router.get('/', getAllUsers); // Get all users route


module.exports = router; // Export user routes