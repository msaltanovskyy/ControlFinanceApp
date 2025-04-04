const { model } = require("mongoose");

const registerUser = async (req, res) => {
    res.json({ message: "Register User" });
}

const loginUser = async (req, res) => {
    res.json({ message: "Login User" });
}

const logoutUser = async (req, res) => {
    res.json({ message: "Logout User" });
}

module.exports = {  
    registerUser,
    loginUser,
    logoutUser
}