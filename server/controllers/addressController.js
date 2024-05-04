const Address = require("../models/addresses");
const User = require("../models/User")

module.exports = {
    addAddress: async (req, res) => {
        const newAddress = new Address(req.body);
        try {
            await newAddress.save();
            const userId = req.body.userId; 
            await User.findByIdAndUpdate(userId, { $push: { addresses: newAddress._id } });
            res.status(200).json({newAddress, message:"Address added successfully"});
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to add the address...");
        }
    },

    getAllAddresses: async (req, res) => {
        console.log("hello")
        try {
            const addresses = await Address.find().sort({ createdAt: -1 });
            res.status(200).json(addresses);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get all the addresses...");
        }
    },
    getAddress: async (req, res) => {
        try {
            const address = await Address.findById(req.params.id);
            res.status(200).json(address);
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to get the address...");
        }
    },

    updateAddress: async (req, res) => {
        try {
            const updateAddress = await Address.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(200).json({ updateAddress, message: "One address updated successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json("Failed to update address...");
        }
    },

    deleteAddress: async (req, res) => {
        try {
            const delAddress = await Address.deleteOne({ _id: req.params.id });
            res.status(200).json({ delAddress, message: "Address deleted successfully" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Failed to delete adddress" });
        }
    },
};