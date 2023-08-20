const { json } = require('body-parser');
const { encrypt, compare } = require('../services/crypto')
const { sendMail } = require('../services/MAIL');

const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Mailgen = require('mailgen');
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { match } = require('assert');
const cookie = require('cookie-parser')

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


const registerUserData = async (req, res) => {
  const { fullName, email, password } = req.body;

  const isExisting = await findUserByEmail(email);
  if (isExisting) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const newUser = await createUser(fullName, email, password);
  if (newUser) {
    return res.status(200).json({ success: true, message: 'User created successfully', user: newUser });
  } else {
    return res.status(400).json({ success: false, message: 'Unable to create new user' });
  }
};


const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const validationResult = await validateUserSignUp(email, otp);

    if (validationResult.success) {
      res.status(200).json({ success: true, user: validationResult.user });
    } else {
      res.status(400).json({ success: false, message: validationResult.message });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const findUserByEmail = async ( email) => {
  const user = await User.findOne({
    email,
  });
  if (!user) {
    // return ("Unable to find id in request");
    return false;
  }
  return user;
};

const createUser = async (fullName, email, password, res) => {
  const hashedPassword = await encrypt(password);
  const otpGenerated = generateOTP();
  const newUser = await User.create({
    fullName,
    email,
    password: hashedPassword,
    otp: otpGenerated,
  });
  if (!newUser) {
    return res.status(400).json(("Unable to create"));
  }
  try {
    await sendMail({
      to: email,
      OTP: otpGenerated,
    });
    return [true, newUser];

  } catch (error) {
    return [false, 'Unable to sign up, Please try again later', error];
  }
};


const validateUserSignUp = async (email, otp) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    if (user.otp !== otp) {
      return { success: false, message: 'Invalid OTP' };
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { active: true } },
      { new: true }
    );

    if (!updatedUser) {
      return { success: false, message: 'Failed to update user' };
    }

    return { success: true, user: updatedUser };
  } catch (error) {
    return { success: false, message: 'An error occurred', error: error.message };
  }
};


// const createToken =(id)=>{
//   return jwt.sign({id},"apple")
// }

const loginAdminData = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      const match = await bcrypt.compare(password, findUser.password);
      if (match) {
        const OTP = findUser.otp;
        await sendMail({
          to: email,
          OTP,
        });
        return res.json({ success: true, message: 'OTP sent successfully' });
      } else {
        return res.json({ success: false, message: 'Invalid password' });
      }
    } else {
      return res.json({ success: false, message: 'User not registered' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }
};


const frogotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email: email });
    if (findUser) {
        const OTP = findUser.otp;
        await sendMail({
          to: email,
          OTP,
        });
        console.log("OTP sent:", OTP);
        return res.json({ success: true, message: 'OTP sent successfully' });
      } 
     else {
      return res.json({ success: false, message: 'User not registered' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'An error occurred' });
  }};

  
  const verifyFrogotPassword = async (req, res) => {
    const { email, otp, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.json({ success: false, message: 'User not found' });
      }
      if (user.otp !== otp) {
        return res.json({ success: false, message: 'Invalid OTP' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { password: hashedPassword } },
        { new: true }
      );
      return res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'An error occurred' });
    }
  };

  const loginUserData = async (req, res) => {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({ email: email });
      
      if (findUser) {
        const match = await bcrypt.compare(password, findUser.password);
        
        if (match) {
          const updatedUser = await User.findOneAndUpdate(
            { _id: findUser._id }, 
            { $set: { active: true } },
            { new: true }
          );
          return res.json({ success: true, message: 'Login successfully', updatedUser });
        } else {
          return res.json({ success: false, message: 'Invalid password' });
        }
      } else {
        return res.json({ success: false, message: 'User not registered' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'An error occurred' });
    }
  };
    
  

module.exports = {
  registerUserData,
  loginUserData,
  loginAdminData,
  verifyEmail,
  frogotPassword,
  verifyFrogotPassword
}

