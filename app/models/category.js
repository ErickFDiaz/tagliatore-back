const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('categories', CategorySchema);
