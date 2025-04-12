const { model } = require("mongoose");
const User = require('../models/User'); // Import user model


//@desc Register user
//@route POST /api/users/register
//@access Public
const registerUser = async (req, res, next) => {
    try {
        if (!req.body) {
            res.status(400);
            return next(new Error('Request body is missing'));
        }

        const { name, email, password } = req.body;

        // Проверка обязательных полей
        if (!name || !email || !password) {
            res.status(400);
            return next(new Error('Please provide name, email, and password'));
        }

        // Создание пользователя
        const user = await User.create({
            name,
            email,
            password,
        });

        res.status(201).json(user);
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
    res.status(200).json({ message: "Get User" });
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
    getUser,
    getAllUsers
}