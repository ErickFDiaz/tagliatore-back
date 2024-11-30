const mongoose = require('mongoose');

const WaiterSchema = new mongoose.Schema({
    dni: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('waiters', WaiterSchema);
