const mongoose = require('mongoose')

const FavouriteSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    products:[
        {
            productInFav:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            }
        }
    ],
},{timestamps:true});

module.exports = mongoose.model("Favourite", FavouriteSchema);