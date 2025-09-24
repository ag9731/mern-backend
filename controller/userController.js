const User = require("../models/users");
const bcrypt = require('bcrypt');
const fs = require("fs");
var jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const {getResetPassword}  =  require("../models/users");
const crypto = require("crypto");

// get all users
exports.getAllUser = async(req,res,next) =>{
     const token = req.cookies.token; // ✅ Get token from cookie
    

    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    try{
        const users = await User.find();
        res.status(200).json({
            message:"Route Working fine",
            users
        })
    }catch(err){
        console.log(err);
    }
}

// Nodemailer
const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    secure: false,
    auth: {
    user: "akashbolster01@gmail.com",
    pass: "hfdm vght jmtq ztzg",
  },
});

// Forgot Password
exports.sendMail = async(req,res,next) => {

    try{
        const { email } = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({
                message:"User Not found"
            })
        }

        const resetToken = user.getResetPassword();
        await user.save({ validateBeforeSave: false });
        // const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

        const info = await transporter.sendMail({
      from: '"Akash" <akashbolster01@gmail.com>', // ✅ match authenticated Gmail
      to: user.email, // ✅ send to user's email string
      subject: "Hello ✔",
      text: "Hello world?",
      html: `<p>You requested a password reset</p>
             <p>Click here: <a href="${resetUrl}">${resetUrl}</a></p>
             <p>This link expires in 15 minutes.</p>`,
    });

    console.log("Message sent:", info.messageId);
    console.log("reset passwordtoken", user.resetPasswordToken);
    res.status(200).json({ message: "Email sent", id: info.messageId });

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Failed to send email", error: error.message });
    }

}

// reser password
exports.resetPassword = async (req,res,next) => {
    try{
        const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");

    const user = await User.findOne({
           resetPasswordToken: hashedToken,
           resetPasswordExpire: { $gt: Date.now() },
     });

       if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

     const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

       // Clear token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
    }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
}


exports.createUser = async(req,res,next) => {
        const { name,email,password } = req.body;
        

        try{
            const saltRounds = 1;
            const hashedPassword = bcrypt.hashSync(password,saltRounds);
            const newUser = await User.create({name,email,password:hashedPassword})
            res.status(201).json({
                message:"User Created Successfully",
                user:newUser
            })
        }catch(err){
            console.log(err);
        }
}

exports.logOutUser = async(req,res,next) =>{
    res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });
  res.json({ message: "Logged out" });
}



exports.userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    dotenv.config({path:'./config/config.env'});

    try {
        // const user = await User.findOne({ email });
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const payload = {
            userId: user._id,
            email: user.email
        };
    

        //  Sign JWT token using HS256
        const token = jwt.sign(payload,  process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: '1h'
        });


        // Cookies
          res.cookie("token", token, {
            httpOnly: true,   // prevents JS access (more secure)
            secure: false,    // set to true if using HTTPS
            sameSite: "strict",
            maxAge: 60 * 60 * 1000 // 1 hour
        });
        return res.status(200).json({ message: 'Login successful', user ,token});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
