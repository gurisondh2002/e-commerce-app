const Order = require("../models/Order");
const User = require("../models/User")

const generateOrderId = () => {
    const orderIdLength = 10;
    let orderId = '';
    for (let i = 0; i < orderIdLength; i++) {
        orderId += Math.floor(Math.random() * 10);
    }
    return orderId;
};

module.exports = {

    addOrder: async (req, res) => {
        try {
            const { userId, productId, address, delivery_status, payment_method } = req.body;

            let payment_status;
            if (payment_method === 'COD') {
                payment_status = 'Not Paid';
            } else {
                payment_status = 'Paid';
            }

            const orderId = generateOrderId();

            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 4);

            const newOrder = new Order({
                orderId,
                userId,
                productId,
                address,
                ddelivery_status: 'Not Delivered',
                payment_method,
                payment_status,
                order_date: new Date(),
                delivery_date: deliveryDate,
            });
            await newOrder.save();
            await User.findByIdAndUpdate(userId, { $push: { orders: newOrder._id } });
            res.status(201).json({ success: true, message: 'Order added successfully', newOrder });
        } catch (error) {
            console.error('Error adding order:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getAllOrders: async (req, res) => {
        try {
            const orders = await Order.find().populate('productId address');
            res.status(200).json({ success: true, orders });
        } catch (error) {
            console.error('Error getting all orders:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },

    getOneOrder: async (req, res) => {
        try {
            const userId = req.params.id;
            const orders = await Order.find({ userId: userId }).populate("productId").populate('address');
            if (!orders || orders.length === 0) {
                return res.status(404).json({ success: false, message: 'Orders not found' });
            }
            res.status(200).json({ success: true, orders });
        } catch (error) {
            console.error('Error getting orders:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}