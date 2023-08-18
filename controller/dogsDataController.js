const { json } = require('body-parser');

const User = require('../models/user')
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
var fs = require('fs');
var path = require('path');
const Vote = require('../models/vote');
const Dog = require('../models/dogs');

const generateDogPairs = async (req, res) => {

    try {
        const allDogs = await Dog.find();
        if (!allDogs || allDogs.length === 0) {
            return res.status(404).json({ message: 'No dogs found' });
        }
        const pairs = [];


        while (pairs.length < 16) {
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
    const { userId, dog1Id, dog2Id, chosenDogId } = req.body;

    try {
        const newVote = new Vote({
            userId,
            dog1Id,
            dog2Id,
            chosenDogId,
        });

        await newVote.save();

        // Update user's progress in the game as needed
        // For example, you can update the user's score or level here

        res.json({ message: 'Vote submitted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


const getAllDogs = async (req, res) => {
    try {
        const allDogs = await Dog.find();
        res.json({ dogs: allDogs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const registerDogsData = async (req, res) => {


}

module.exports = {
    generateDogPairs,
    submitVote,
    getAllDogs
    // singleCustomerDetails,
    // deleteCustomerDetails
}

