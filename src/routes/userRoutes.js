const express = require('express');
const router = express.Router();
const { protect, roleIsAdmin } = require("../middleware/authMiddleware"); // Import auth middleware

const {
    registerUser,
    loginUser,
    logoutUser,
    editUser,
    deactiveUser,
    getAllUsers,
    setBalance,
    getLoggedInUser,
    updateUserRole
} = require('../controllers/userController'); // Import user controller

//POST routes
router.post('/register',protect,roleIsAdmin(), registerUser); // Register user route
router.post('/login', loginUser); // Login user route
router.post('/logout',protect,logoutUser); // Logout user route
router.post('/edit/:id',protect,editUser); // Edit user route
router.post('/deactive/:id',protect,roleIsAdmin(), deactiveUser); // Deactive user route
router.post('/setbalance/:id',protect, setBalance); // Set balance route
router.post('/updateRole/:id',protect,roleIsAdmin(), updateUserRole); // Update user role route
//GET routes
router.get('/', protect,roleIsAdmin(),getAllUsers); // Get all users route
router.get("/me", protect, getLoggedInUser); // Get logged in user route

module.exports = router; // Export user routes