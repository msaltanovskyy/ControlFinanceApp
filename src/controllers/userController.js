const User = require('../models/User'); // Import user model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing
const validator = require('deep-email-validator'); // Import email validator
const JWT = require('jsonwebtoken'); // Import JWT for token generation
const asyncHandler = require('express-async-handler');


// Import dotenv for environment variables
const geneatateJWT = (id) => {
    return JWT.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

//@desc Get logged in user
//@route GET /api/users/me
//@access Private
const getLoggedInUser = asyncHandler(async (req, res) => {
    const { _id, name, email } = await User.findById(req.user.id);
    res.status(200).json({
        id: _id,
        name,
        email,
    });
});


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


        // check existing email
        const existsUser = await User.findOne({ email });
        if (existsUser) {
            res.status(400);
            return next(new Error('User already exists'));
        }

        //check email validity
        const { valid, reason } = await validator.validate(email);
        if (!valid) {
            let errorMessage;
        
            // Customize error messages based on the reason
            switch (reason) {
                case 'tooGeneric':
                    errorMessage = 'The email address is too generic. Please use a more specific email address.';
                    break;
                case 'smtp':
                    errorMessage = 'The email domain is not reachable. Please check the email address for typos or try a different one.';
                    break;
                case 'invalid':
                    errorMessage = 'The email address format is invalid. Please ensure it follows the format: user@example.com.';
                    break;
                case 'disposable':
                    errorMessage = 'The email address is from a disposable email provider. Please use a permanent email address.';
                    break;
                case 'unknown':
                default:
                    errorMessage = 'The email address is not valid. Please try again!';
                    break;
            }
        
            return res.status(400).json({
                status: 'error',
                message: errorMessage,
                reason: reason
            });
        }

        // check password length
        if (password.length < 8) {
            res.status(400);
            return next(new Error('Password must be at least 8 characters'));
        }

        const hashedPassword = await bcrypt.hash(password, salt); // Hash password

        // create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        
        jwtToken = geneatateJWT(user._id); // Generate JWT token
        res.status(201).json({
            user,
            token: jwtToken,
        });
        console.log(user.name + " registered successfully" + " with email: " + user.email );
        console.log("User ID: " + user._id); 
        console.log("User JWT: " + jwtToken);
    } catch (error) {
        next(error);
    }
};

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Проверка обязательных полей
        if (!email || !password) {
            res.status(400);
            return next(new Error('Please provide email and password'));
        }

        // Поиск пользователя по email
        const user = await User.findOne({ email });

        // Проверка существования пользователя
        if (!user) {
            res.status(401);
            return next(new Error('User not found'));
        }

        // Сравнение пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401);
            return next(new Error('Password is incorrect'));
        }

        // Генерация JWT токена
        const token = geneatateJWT(user._id);

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        next(error); // Передача ошибки в middleware для обработки ошибок
    }
};


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
    getAllUsers,
    getLoggedInUser
}