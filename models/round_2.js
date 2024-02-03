const mongoose = require('mongoose');

const round_2Schema = new mongoose.Schema({
    user: String,
    pair: [String],
    chosenDog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
    },
  });
  
  const Round_2 = mongoose.model('Round_2', round_2Schema);
  
  module.exports = Round_2;
  