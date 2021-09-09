const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);