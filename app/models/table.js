const mongoose = require('mongoose');

const TableSchema = new mongoose.Schema({
    table_number: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    status: {
        type: String,
        enum: ["available", "occupied", "reserved"],
        default: "available",
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('tables', TableSchema);
