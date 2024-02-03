const mongoose = require('mongoose');

const round_3Schema = new mongoose.Schema({
    user: String,
    pair: [String],
    chosenDog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
    },
  });
  
  const Round_3 = mongoose.model('Round_3', round_3Schema);
  
  module.exports = Round_3;
  