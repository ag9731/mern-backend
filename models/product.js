const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName:{
        type:String,
    },
    productDescription:{
        type:String,
    }
})

module.exports = mongoose.model("Products",productSchema);