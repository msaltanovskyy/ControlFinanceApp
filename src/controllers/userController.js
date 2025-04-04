const { model } = require("mongoose");
//const { get } = require("../routes/userRoutes");

const registerUser = async (req, res) => {
    res.json({ message: "Register User" });
}

const loginUser = async (req, res) => {
    res.json({ message: "Login User" });
}

const logoutUser = async (req, res) => {
    res.json({ message: "Logout User" });
}

const editUser = async (req, res) => {
    res.json({ message: "Edit User" });
}
const deactiveUser = async (req, res) => {
    res.json({ message: "Deactive User" });
}

const getUser = async (req, res) => {
    res.json({ message: "Get User" });
}

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