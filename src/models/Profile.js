const mongoose = required('mongoose')

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

        type : {
            type: String,
            required: [true, "Please select profile type!!!"]
        },

        isActive: {
            type: Boolean,
            default: true
        },
        
    },

    {timestamps: true}
);

module.exports = mongoose.model('profile', profileSchema)


/// RU: Профиль - это профиль затрат/доходов от определеной категории
/// EN: Profile is a profile of expenses/income from a certain category
