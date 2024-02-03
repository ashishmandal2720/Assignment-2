const mongoose = require('mongoose');
const dogs = require('./dogs');

const gameSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rounds: [{
        type: mongoose.Schema.Types.Mixed,
        ref: "Dog"
    }], // Use Mixed type for an array of objects
    round_2: [{
        type: mongoose.Schema.Types.Mixed,
        ref: "Dog"
    }], // Use Mixed type for an array of objects
    // rounds: [{
    //   pair: [String],        
    //   chosenDog: [String],  
    // }],

});

module.exports = mongoose.model('Game', gameSchema);
