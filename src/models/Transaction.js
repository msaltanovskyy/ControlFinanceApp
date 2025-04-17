const mongoose = require('mongoose'); // Import mongoose

const transactionSchema = mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select users name!!!"]
    },

    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select profile name!!!"]
    },

    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select item name!!!"]
    },
    
    amount: {
        type: Decimal128,
        required: [true, "Select amount of items!!!"]
    },

    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('transaction', transactionSchema)