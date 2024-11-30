const mongoose = require('mongoose');

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
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('orders', OrderSchema);
