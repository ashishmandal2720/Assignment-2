const { json } = require('body-parser');

const User = require('../models/user')
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
const Vote = require('../models/round_1');
const Dog = require('../models/dogs');
const Game = require('../models/gameSchema');
const Round_2 = require('../models/round_2');

const generateDogPairs = async (req, res) => {
  try {
    const allDogs = await Dog.find();
    if (!allDogs || allDogs.length === 0) {
      return res.status(404).json({ message: 'No dogs found' });
    }
    const pairs = [];
    while (pairs.length < 2) {
      const randomIndex1 = Math.floor(Math.random() * allDogs.length);
      const randomIndex2 = Math.floor(Math.random() * allDogs.length);

      if (randomIndex1 !== randomIndex2) {
        pairs.push([allDogs[randomIndex1], allDogs[randomIndex2]]);
      }
    }
    res.json({ dogPairs: pairs });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const submitVote = async (req, res) => {
  try {
    const { user, pair, chosenDog } = req.body;
    const vote = new Vote({
      user,
      pair,
      chosenDog,
    });

    await vote.save();
    const votes = await Vote.find({ user });
    console.log(`User ${user} has made ${votes.length} votes.`);

    if (votes.length === 4) {
      const game = new Game({
        user,
        rounds: votes,
      });

      await game.save();
      console.log(`Game for user ${user} created.`);
    } else {
      console.log(`Game not finished yet for user ${user}.`);
    }

    res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error recording vote' });
  }
};
const submitVote2 = async (req, res) => {
  try {
    const { user, pair, chosenDog } = req.body;
    const vote = new Round_2({
      user,
      pair,
      chosenDog,
    });

    await vote.save();
    const game = await Game.findOne({ user });
    // console.log(`User ${user} has made ${votes.length} votes.`);

    if (game) {
      game.round_2.push(vote);
      await game.save();
      console.log(`Round 2 vote recorded successfully for user ${user}.`);
    } else {
      console.log(`Game not found for user ${user}.`);
    }
    res.status(201).json({ message: 'Round 2 vote recorded successfully' });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ message: 'Error recording round 2 vote' });
  }
};




// const getAllDogs = async (req, res) => {
//   try {
//     const allDogs = await Game.find();
//     res.json({ dogs: allDogs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const getAllDogs = async (req, res) => {
//   try {
//     const allChosenDogs = await Vote.find({}, { chosenDog: 1, _id: 0 }).populate("chosenDog");
//     const pairs = [];
//     while (pairs.length < 2) {
//       const randomIndex1 = Math.floor(Math.random() * allChosenDogs.length);
//       const randomIndex2 = Math.floor(Math.random() * allChosenDogs.length);

//       if (randomIndex1 !== randomIndex2) {
//         pairs.push([allChosenDogs[randomIndex1], allChosenDogs[randomIndex2]]);
//       }
//     }
//     res.json({ dogPairs: pairs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// const getAllDogs = async (req, res) => {
//   try {
//     const allChosenDogs = await Game.find({}, 'user rounds.chosenDog round_2.chosenDog ')
//     .populate('user' ,'fullName')
//     // .populate('rounds')
//     // .select("User.fullName");    

//     res.send({ GameHistory: allChosenDogs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

const getAllDogs = async (req, res) => {
  try {
    const allChosenDogs = await Game.find({})
      .populate({
        path: 'user',
        select: 'fullName', // Populate the 'user' field with 'fullName'
      })
      // .populate({
      //   path: 'round_2',
        // populate: {
        //   path: 'chosenDog', // Populate the 'chosenDog' reference in 'rounds'
        //   model: 'Dog', // Specify the model to use (assuming it's 'Dog')
        // },
      // });
    res.json({ GameHistory: allChosenDogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const staffByRight = async (req, res) => {
  const rightData = await Vote.find({ _id: req.body.Vote_id }).populate("chosenDog");
  res.send(rightData)
}






module.exports = {
  generateDogPairs,
  submitVote,
  getAllDogs,
  staffByRight,
  submitVote2,
  // getRound_2Data
}

