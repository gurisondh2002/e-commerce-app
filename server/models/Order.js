const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    orderId:{
        type:Number,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Product",
    },
    address: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    delivery_status: {
        type: String,
        enum: ['Delivered', 'Not Delivered'], 
        default: 'Not Delivered',
        required: true,
    },
    payment_method: {
        type: String,
        enum: ['COD', 'Google Pay', 'PhonePe', 'Card', 'NetBanking'], 
        required: true,
    },
    payment_status: {
        type: String,
        enum: ['Paid', 'Not Paid'], 
        default: 'Paid', 
    },
    order_date: {
        type: Date,
        default: Date.now 
    },
    delivery_date: {
        type: Date, 
    }
},{timestamps:true});

module.exports = mongoose.model("Order",OrderSchema);