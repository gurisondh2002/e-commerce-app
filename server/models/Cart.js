const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    products:[
        {
            productInCart:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
            },
            quantity:{
                type:Number,
                default:1,
            },
            subtotal: {
                type: Number,
                default: 0,
            }
        }
    ],
    total: {
        type: Number,
        default: 0,
    }
},{timestamps:true});

module.exports = mongoose.model("Cart", CartSchema);