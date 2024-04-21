const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
    },
    location: {
        type: String,
        default: "Punjab",
    },
    addresses: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Address'
    },
    orders:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Order',
    }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);