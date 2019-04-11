const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    date: String,
    lenght: Number
});

module.exports = mongoose.model('Event', productSchema);
