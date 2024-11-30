const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders',
        required: true,
    },
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'dishes',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('order_details', OrderDetailSchema);
