const mongoose = require('mongoose');

const dogsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: {
        data: Buffer,
        type: String, 
    },
    attributes: { type: String },
});

module.exports = mongoose.model('dogs', dogsSchema);
