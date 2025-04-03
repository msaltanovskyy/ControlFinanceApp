const mongoose = require('mongoose'); // Import mongoose

const transactionSchema = mongoose.Schema({

    // RU: user - это тот кто покупает предмет
    // ENG: user - this is the one who buys the item

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select users name!!!"]
    },

    // RU: profile - это профиль в котором будет храниться предмет
    // например еда, одежда, развлечения и т.д.
    // ENG: profile - this is the profile in which the item will be stored
    // for example food, clothing, entertainment, etc.

    profile: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select profile name!!!"]
    },

    // RU: item - это предмет который покупает пользователь
    // например еда, одежда, развлечения и т.д.
    // ENG: item - this is the item that the user buys
    // for example food, clothing, entertainment, etc.

    item: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Select item name!!!"]
    },

    // RU: amount - это количество предметов которые покупает пользователь
    // например 1, 2, 3 и т.д.
    // ENG: amount - this is the number of items that the user buys
    // for example 1, 2, 3, etc.
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