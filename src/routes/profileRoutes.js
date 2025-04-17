const express = require('express');
const router = express.Router();
const { protect, roleIsAdmin } = require("../middleware/authMiddleware"); // Import auth middleware


const {
    createProfile,
    updateProfile,
    deactiveProfile,
    deleteProfile,
    getAllProfiles,
} = require('../controllers/profileController'); // Import profile controller

router.post('/create', protect, roleIsAdmin(), createProfile); // Create profile route
router.post('/update/:id', protect, roleIsAdmin(), updateProfile); // Update profile route
router.post('/deactive/:id', protect, roleIsAdmin(), deactiveProfile); // Deactive profile route
router.delete('/delete/:id', protect, roleIsAdmin(), deleteProfile); // Delete profile route
router.get('/', protect, roleIsAdmin(), getAllProfiles); // Get all profiles route

module.exports = router; // Export user routes