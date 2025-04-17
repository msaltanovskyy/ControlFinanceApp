const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

//desc: Get all profiles
//@route GET /api/profiles
//@access Private
const getAllProfiles = asyncHandler(async (req, res) => {
    const profiles = await Profile.find();
    
    if (!profiles) {
        res.status(404);
        throw new Error('Profiles not found');
    }

    if(profiles.length === 0){
        return res.status(200).json({message: "No profiles found"});
    }

    res.status(200).json(profiles);
});


//desc: Create a profile
//@route POST /api/profiles/create
//@access Private
const createProfile = asyncHandler(async (req, res) => {

    const {name, description} =req.body

    if(!name || !description){
        res.status(400);
        throw new Error('Please add all fields');
    }

    const profile = await Profile.create({
        name,
        description,
        creater: req.user._id, //req.user._id is the id of the user who is logged in
    });

    if(!profile){
        res.status(400);
        throw new Error('Invalid profile data');
    }

    res.status(201).json({
        _id: profile.id,
        name: profile.name,
        description: profile.description,
        creater: profile.creater,
    });

});

//desc: Update a profile
//@route POST /api/profiles/update/:id
//@access Private
const updateProfile = asyncHandler(async (req, res) => {
    const {name, description} =req.body

    if(!name || !description){
        res.status(400);
        throw new Error('Please add all fields');
    }

    const profile = await Profile.findByIdAndUpdate(req.params.id, {
        name,
        description,
    }, {new: true})

    res.status(200).json({
        _id: profile.id,
        name: profile.name,
        description: profile.description,
    });

});

const deactiveProfile = asyncHandler(async (req, res) => {  
    const profile = await Profile.findById(req.params.id);

    if (!profile) {
        res.status(404);
        throw new Error('Profile not found');
    }

    profile.isActive = !profile.isActive; // Toggle isActive status

    const message = profile.isActive ? 'Profile activated successfully' : 'Profile deactivated successfully';

    // Save the updated profile
    const updatedProfile = await profile.save();
    if (!updatedProfile) {
        res.status(500);
        throw new Error('Error updating profile');
    }

    // Send the response
    res.status(200).json({
        message: message,
        profile: {
            id: updatedProfile._id,
            name: updatedProfile.name,
            description: updatedProfile.description,
            isActive: updatedProfile.isActive,
        },
    });
});


const deleteProfile = asyncHandler(async (req, res) => {

    res.status(200).json("delete profile");


});

module.exports = {
    getAllProfiles,
    createProfile,
    updateProfile,
    deactiveProfile,
    deleteProfile,
};