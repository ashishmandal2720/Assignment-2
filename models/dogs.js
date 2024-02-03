const mongoose = require('mongoose');

const dogsSchema = new mongoose.Schema({
    name: String,
    attributes: String 
});

module.exports = mongoose.model('Dog', dogsSchema);
