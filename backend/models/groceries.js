const mongoose = require('mongoose')

const grocerySchema = mongoose.Schema({
    food_name: {
        type: String,
        required: 'Please include the name of the food'
    },
    food_qty: {
        type: Number,
        minimum: 0,
        default: 1
    },
    storage_area: {
        type: String
    },
    isConsumed: {
        type: Boolean,
        default: false,
    },
    isExpired: {
        type: Boolean,
        default: false,
    },
    expiration_date: {
        type: Date
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Grocery', grocerySchema)