const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    // image:{
    //     data: { type: Buffer, default: null }, 
    //     contentType: { type: String, default: null },
    // },
    location:{
        type:String,
        default:"Punjab",
    },
},{timestamps:true});

module.exports = mongoose.model("User", UserSchema);