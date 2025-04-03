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
        
    },

    {timestamps: true}
);

module.exports = mongoose.model('profile', profileSchema)


/// Профиль - это набор которые можно купить, по катеогориям,например, еда, одежда, развлечения и т.д.
