const mongoose = require("mongoose");

const subCategories = ['Clothing', 'Bags', 'Watches', 'Shoes', 'Accessories', 'Skin Care'];

const ProductSchema = new mongoose.Schema({
    title :{
        type:String,
        required:true,
    },
    supplier :{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
    imageUrl :{
        type:String,
        required:false,
    },
    discountPrice:{
        type:String,
        required:true, 
    },
    discount:{
        type: Number,
        required: false,
    },
    category: {
        type: String,
        enum: ['Mens', 'Women', 'Kids']
    },
    subCategory: {
        type: String,
        enum: subCategories,
        required: true,
    },
    size: {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    description :{
        type:String,
        required:true,
    },
    product_location :{
        type:String,
        required:true,
    },
}, {timestamps:true});

module.exports = mongoose.model("Product", ProductSchema);