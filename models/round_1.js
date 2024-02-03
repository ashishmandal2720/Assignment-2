const mongoose = require('mongoose');

const round_1Schema = new mongoose.Schema({
    user: String,
    pair: [String],
    chosenDog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dog'
    },
  });
  
  const Round_1 = mongoose.model('Round_1', round_1Schema);

  module.exports = Round_1;
  