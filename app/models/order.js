const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
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
});

const OrderSchema = new mongoose.Schema({
    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tables',
        required: true,
    },
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'clients',
    },
    waiter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'waiters',
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "canceled"],
        default: "pending",
    },
    active: {
        type: Boolean,
        default: true,
    },
    orderDetails: [OrderDetailSchema] // Array de detalles de la orden
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('orders', OrderSchema);
