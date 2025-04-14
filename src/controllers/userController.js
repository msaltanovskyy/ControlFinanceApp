const User = require('../models/User'); // Import user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

//@desc Register user
//@route POST /api/users/register
//@access Public
const registerUser = async (req, res, next) => {

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds); // Generate salt for hashing

    try {
        if (!req.body) {
            res.status(400);
            return next(new Error('Request body is missing'));
        }

        const { 
            name, 
            email, 
            password 
        } = req.body;

        // check if user already exists
        if (!name || !email || !password) {
            res.status(400);
            return next(new Error('Please provide name, email, and password'));
        }


        // check if email is valid
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            res.status(400);
            return next(new Error('User already exists'));
        }

        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        res.status(201).json(user);
        console.log(user.name + " registered successfully");
    } catch (error) {
        next(error);
    }
};

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res) => {
    res.json({ message: "Login User" });
}


//@desc Logout user
//@route POST /api/users/logout
//@access Private
const logoutUser = async (req, res) => {
    res.json({ message: "Logout User" });
}

//@desc Edit user
//@route POST /api/users/edit/:id
//@access Private
const editUser = async (req, res) => {
    res.json({ message: "Edit User" });
}

//@desc Set balance
//@route POST /api/users/setbalance/:id
// //@access Private
const setBalance = async (req, res) => { 
    res.json({ message: "Set Balance" });
}

//@desc Deactive user
// @route POST /api/users/deactive/:id
// @access Private
const deactiveUser = async (req, res) => {
    res.json({ message: "Deactive User" });
}

//@desc Get user
//@route GET /api/users/:id
//@access Private
const getUser = async (req, res) => {
    const userId = req.params.id;
    if (!userId) {
        res.status(400);
        return next(new Error('User ID is required'));
    }
    res.status(200).json(users);
}

//@desc Get all users
//@route GET /api/users
//@access Private
const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}


module.exports = {  
    registerUser,
    loginUser,
    logoutUser,
    editUser,
    deactiveUser,
    setBalance,
    getUser,
    getAllUsers
}