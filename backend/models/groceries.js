const mongoose = require('mongoose')

const grocerySchema = mongoose.Schema({
    food_name: {
        type: String,
        required: true
    },
    food_qty: {
        type: Number,
        default: 1
    },
    storage_area: {
        type: String
    },
    expiration_date: {
        type: Date
    }
}, { timestamps: true }
);

module.exports = mongoose.model('Grocery', grocerySchema)