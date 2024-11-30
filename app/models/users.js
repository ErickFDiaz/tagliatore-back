const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    dni: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    name: {
        type: String,
        required: true,
    },
    address: {
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

module.exports = mongoose.model('users', UserSchema);
