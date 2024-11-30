const mongoose = require('mongoose');

const DishSchema = new mongoose.Schema({
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: [String], // List of ingredients
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String, // URL for the image
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('dishes', DishSchema);
