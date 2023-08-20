const mongoose = require('mongoose');

const gameHistorySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  round_1: {
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'Round_1',
  },
  round_2: {
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'Round_2',
  },
  finalRound: {
    type: mongoose.Schema.Types.ObjectId, 
      ref: 'finalRound',
  },
});

module.exports = mongoose.model('gameHistory', gameHistorySchema);
