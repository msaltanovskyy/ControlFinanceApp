const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt'); 


//@desc check if admin user exists
//email: admin@gmail.com
//password: admin123

const checkIsAdmin =  async () => {
    const adminCount = await User.countDocuments({ isAdmin: true });
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash("admin123", salt); 

        if (adminCount === 0) {
            const user = await User.create({
                name : "Admin",
                email: "admin@gmail.com",
                password: hashedPassword,
                isAdmin: true,
            })
            console.log(`Admin user created: ${user._id}`);
        }

}


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);

        // Check if admin user exists, if not create one
        await checkIsAdmin();
        
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;