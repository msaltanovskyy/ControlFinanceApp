const mongoose = require('mongoose');


const userSchema = mongoose.Schema(
    {
        name :{
            type: String,
            required: [true, "Please enter a name"]
        },
        
        email: {
            type: String,
            required: [true, 'Please enter a email'],
            unique: true
        },

        password: {

            type: String,
            required: [true, "Please enter a password"],
    
        },

        balance: {
            type: Number,
            default: 0
        },
        
        isAdmin: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        },

    },
    {timestamps: true}
);

module.exports = mongoose.model('user', userSchema)


//PS Добавить возможность месячного отчета по всем тратам по почте