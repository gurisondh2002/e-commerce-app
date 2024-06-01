const Order = require("../models/Order");
const User = require("../models/User")
const Stripe  = require('stripe')

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)


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


            try{
                const params = {
                    submit_type : 'pay',
                    mode : "payment",
                    payment_method_types : ['card'],
                    billing_address_collection : "auto",
                    shipping_options : [{shipping_rate : "shr_1PMovQ04h1WM8e3abkbkhsGj"}],
          
                    line_items : req.body.map((item)=>{
                      return{
                        price_data : {
                          currency : "inr",
                          product_data : {
                            name : item.title,
                            // images : [item.image]
                          },
                          unit_amount : item.price * 100,
                        },
                        adjustable_quantity : {
                          enabled : true,
                          minimum : 1,
                        },
                        quantity : item.qty
                      }
                    }),
          
                    success_url : `${process.env.FRONTEND_URL}/success`,
                    cancel_url : `${process.env.FRONTEND_URL}/cancel`,
          
                }
          
                
                const session = await stripe.checkout.sessions.create(params)
                // console.log(session)
                res.status(200).json(session.id)
               }
               catch (err){
                  res.status(err.statusCode || 500).json(err.message)
               }

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
    },

    payment: async(req,res) =>{
       
      
    }
}