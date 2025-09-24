const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
    name :{
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot exceed 30 chatacters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email : {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        // validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
    type: String,
    required: [true, "Plese Enter a strong password"],
    minLength: [8, "Password must be 8 characters long"],
    select: false,
  },
    resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.methods.getResetPassword = function(){
    resetpasswordtoken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken =  crypto
        .createHash("sha256")
        .update(resetpasswordtoken)
        .digest("hex");

        this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        return resetpasswordtoken;
}

module.exports = mongoose.model("User",userSchema);