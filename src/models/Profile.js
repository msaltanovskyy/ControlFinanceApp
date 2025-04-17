const mongoose = require('mongoose')

const profileSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please select profile name!!!"]
        },
        
        description: {

            type: String,
            required: [true, "Please add description"],
        },

        created_AT:  { //date now
            type: Date,
            default: Date.now
        },

        isActive: {
            type: Boolean,
            default: true
        },

        creater: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        
    },

    {timestamps: true}
);

module.exports = mongoose.model('profile', profileSchema)


/// RU: Профиль - это профиль затрат/доходов от определеной категории
/// EN: Profile is a profile of expenses/income from a certain category
