const Products = require("../models/product");


exports.getAllProducts = (req,res,next) => {
    try{
        res.status(200).json({
            message:"You Are In Products Page",
        })
    }catch(err){
        console.log(err);
    }
}