const { json } = require('body-parser');

const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const user = require('../models/user');
const Mailgen = require('mailgen');
const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
      user: 'ashishm.programmics@gmail.com',
      pass: 'cywcyfjrfiqasqwo'
  }
});


const sendOtp = async(req, res) =>{
  try {
    const { email } = req.body;
    // const user = await User.findOne({ email });
   
    // if (user) {
    //   return res.status(200).json({ message: 'User not found' });
    // }

    const otpSecret = speakeasy.generateSecret();
    user.otpSecret = otpSecret.base32;
    // await user.save();

    const otpToken = speakeasy.totp({
      secret: user.otpSecret,
      encoding: 'base32',
    });
    const mailOptions = {
      from: 'ashishm.programmics@gmail.com',
      to: email,
      subject: 'Your OTP for Login',
      text: `Your OTP is: ${otpToken}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Error sending OTP' });
  }}

  

const registerUserData = async(req, res) =>{
        try {
          const { email, password, otp } = req.body;
          const User = await User.findOne({ email });
      
          if (User) {
            return res.status(404).json({ message: 'User already exist' });
          }
      
          const otpValid = speakeasy.totp.verify({
            secret: user.otpSecret,
            encoding: 'base32',
            token: otp,
          });
      
          if (!otpValid) {
            return res.status(401).json({ message: 'Invalid OTP' });
          }
      
          // Create the user in the database
          const newUser = new User({
            email,
            password,
            otpSecret: user.otpSecret,
          });
          await newUser.save();
      
          res.json({ message: 'User registered successfully' });
        } catch (error) {
          console.error('Error during registration:', error);
          res.status(500).json({ message: 'Error during registration' });
        }
      };        



// const { EMAIL, PASSWORD } = require('../env.js')

/** send mail from testing account */
const signup = async (req, res) => {

    /** testing account */
    let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    let message = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Successfully Register with us.", // plain text body
        html: "<b>Successfully Register with us.</b>", // html body
      }


    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            msg: "you should receive an email",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("Signup Successfully...!");
}

/** send mail from real gmail account */
const getbill = (req, res) => {

    // const { userEmail } = req.body;

    let config = {
        service : 'gmail',
        auth : {
            user: 'ashishm.programmics@gmail.com',
            pass: 'cywcyfjrfiqasqwo'
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Mailgen",
            link : 'https://mailgen.js/'
        }
    })

    let response = {
        body: {
            name : "Daily Tuition",
            intro: "Your bill has arrived!",
            table : {
                data : [
                    {
                        item : "Nodemailer Stack Book",
                        description: "A Backend application",
                        price : "$10.99",
                    }
                ]
            },
            outro: "Looking forward to do more business"
        }
    }

    let mail = MailGenerator.generate(response)

    let message = {
        from : 'ashishm.programmics@gmail.com',
        to : 'ashishmandal529@gmail.com',
        subject: "Place Order",
        html: mail
    }

    transporter.sendMail(message).then(() => {
        return res.status(201).json({
            msg: "you should receive an email"
        })
    }).catch(error => {
        return res.status(500).json({ error })
    })

    // res.status(201).json("getBill Successfully...!");
}




module.exports = {
    registerUserData,  
    getbill,
    sendOtp,
       // deleteCustomerDetails
}

