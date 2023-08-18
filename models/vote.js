const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
// gameId: ,
  userId: String,
  dog1Id: String,
  dog2Id: String,
  chosenDogId: String,
});

const Vote = mongoose.model('Vote', voteSchema);

module.exports = Vote;
