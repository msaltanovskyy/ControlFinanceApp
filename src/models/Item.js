const mongoose = required("mongoose")
const { Decimal128 } = require("mongoose")

const itemSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Enter name"]
    },

    price: {
        type: Decimal128,
        required: [true,"Select price of item!!!"]
    },
    
    desc: {
        type: String,
        required: [true, "Enter description"],
        maxLength: [100, "Description must be less than 100 characters"]
    },

    img: {
        type: String,
        required: [true, "Enter image"]
    },

    isAktive: {
        type: Boolean,
        default: true        
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model("item", itemSchema)



// предмет задаеться стандартная цена 1.00 после создания увеличиваеться на количество покупок