const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path:'./config/config.env'});
const uri = process.env.DB;
console.log(uri);

async function connectDB(){
      try{
        await mongoose.connect(uri);
        console.log("Connected to database successfully");
    } catch(err) {
        console.error("Error connecting to MongoDB", err);
    }
}

module.exports = connectDB; 